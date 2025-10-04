import express from "express";
import { addfood, foodList, removeFood } from "../controllers/foodcontroller.js";
import multer from "multer";

const foodrouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage });

foodrouter.post("/add", upload.single("image"), addfood);
foodrouter.get("/list", foodList);
foodrouter.post("/remove", removeFood);

export default foodrouter; // ✅ ES module default export