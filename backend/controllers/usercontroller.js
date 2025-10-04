import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { userModel } from "../models/usermodel.js";   // ✅ use curly braces



// 🔐 Helper to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 📝 Register a new user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error("Registration Error StackTrace:\n", error);
    res.status(500).json({ success: false, message: "Error while registering" });
  }
};

// 🔐 Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// ✅ ESM export
export { loginUser, registerUser };
