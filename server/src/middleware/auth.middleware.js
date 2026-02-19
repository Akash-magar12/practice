import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  // 1. Get token from cookies (requires cookie-parser in app.js)
  const { token } = req.cookies;
  
  // 2. If no token, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "No token provided, access denied" 
    });
  }

  try {
    // 3. Verify token. If it's incorrect/expired, it throws an error and goes to 'catch'
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user by ID from decoded token and attach to request object
    // We remove the password from the object for security
    const user = await userModel.findById(decoded.id)
    console.log(user)

    // 5. Check if user actually exists in DB
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // 6. Attach user to req so subsequent routes can use it (e.g., req.user._id)
    req.user = user;
    
    // 7. Move to the next controller/middleware
    next();
  } catch (error) {
    // 8. Handle errors (Invalid signature, expired token, etc.)
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ 
      success: false,
      message: "Invalid or expired token" 
    });
  }
};