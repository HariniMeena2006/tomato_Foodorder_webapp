import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect('mongodb+srv://Harinimeena:harinimeena.235@cluster0.9p8xdyp.mongodb.net/food-del');
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

export { connectdb }; // ✅ Named export for ES modules