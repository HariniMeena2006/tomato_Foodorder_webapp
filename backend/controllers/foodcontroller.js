import foodmodel from "../models/foodmodel.js";
import fs from "fs";

// Add food item
const addfood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const image_filename = req.file.filename;
    const food = new foodmodel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all food items
const foodList = async (req, res) => {
  try {
    const foods = await foodmodel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodmodel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    fs.unlink(`uploads/${food.image}`, () => {
      console.log("Image deleted from uploads");
    });

    await foodmodel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addfood, foodList, removeFood };

