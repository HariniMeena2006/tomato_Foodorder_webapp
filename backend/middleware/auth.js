import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Check Authorization header first
  const authHeader = req.headers.authorization || req.headers.token; 
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach userId to request
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
