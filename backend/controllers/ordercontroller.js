import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import { userModel } from "../models/usermodel.js";

// Place order: create Razorpay order (no DB write yet)
export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { amount } = req.body;
    if (!amount || Number(amount) <= 0) return res.json({ success: false, message: "Invalid amount" });

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await instance.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    return res.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Failed to create order" });
  }
};

// Verify: verify Razorpay payment, then persist order and clear cart
export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, amount, address } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.json({ success: false, message: "Missing Razorpay fields" });

    // 1️⃣ Signature verification
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid signature" });
    }

    // 2️⃣ Verify payment status from Razorpay
    const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET });
    const paymentInfo = await rz.payments.fetch(razorpay_payment_id);

    if (!paymentInfo || paymentInfo.status !== "captured") {
      return res.json({ success: false, message: `Payment not completed. Status: ${paymentInfo?.status}` });
    }

    // 3️⃣ Save order in DB
    const doc = await orderModel.create({
      userId: req.userId,
      items: Array.isArray(items) ? items : [],
      amount: Number(amount),
      address: typeof address === "object" ? address : {},
      status: "food preparing",
      payment: true,
    });

    // 4️⃣ Clear user's cart
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} }, { new: true });

    return res.json({ success: true, orderId: doc._id });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Verification failed" });
  }
};
export const userOrders=async(req,res)=>{
   try{
      const orders=await orderModel.find({userId:req.userId})
      res.json({success:true,data:orders})
   }catch(error){
    console.log(error)
    res.json({success:false,message:error})
   }
}
//listing orders for admin panel
export const listOrders=async(req,res)=>{
  try{
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})

  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})

  }

}
//api for updating order status
export const updateStatus=async(req,res)=>{
   try{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})

  }

}
