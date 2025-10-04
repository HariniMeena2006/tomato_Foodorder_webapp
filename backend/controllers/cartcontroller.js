import { userModel } from "../models/usermodel.js";
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // from token
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while adding to cart" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId; // from authMiddleware
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item removed successfully" });
  } catch (error) {
    console.log("Error in removeFromCart:", error);
    res.json({ success: false, message: "Error removing item from cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.userId; // extracted from token by middleware
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Error fetching cart:", error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

// Clear entire cart for the authenticated user
const clearCart = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    return res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.json({ success: false, message: "Error clearing cart" });
  }
};

export{addToCart,removeFromCart,getCart, clearCart}