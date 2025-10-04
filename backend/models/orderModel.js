import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  // Store full array of items (each item can be the product snapshot + quantity)
  items: { type: [Object], required: true },
  // Store amount as a number (INR)
  amount: { type: Number, required: true },
  // Store full address object captured from the form
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
