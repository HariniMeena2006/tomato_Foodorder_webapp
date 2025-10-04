import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/ordercontroller.js"
const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",authMiddleware,verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrders);
orderRouter.get('/list',listOrders);
orderRouter.put('/status',updateStatus);
export default orderRouter;