
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./config/db.js";
import foodrouter from "./routes/foodroutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartroutes.js";
import orderRouter from "./routes/orderroute.js";

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectdb();

// API endpoints
app.use("/api/food", foodrouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


// Test route
app.get("/", (req, res) => {
  res.send("API working");
});

// Start server
const port=process.env.PORT||4000
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
