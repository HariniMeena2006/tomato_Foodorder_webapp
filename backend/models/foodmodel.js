// Use ESM import instead of require
import mongoose from "mongoose";

// Creating schema for the data
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },        // ✅ use "required" not "require"
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

// Creating model for the data
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// Export the model
export default foodModel;
