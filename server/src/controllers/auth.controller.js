import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Basic Validation: Ensure all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Uniqueness Validation: Check if user already exists
    // We check both email and username to prevent duplicates
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or Email already taken" });
    }

    // 3. Create the user
    // This will trigger your pre-save hashing middleware automatically
    const user = await userModel.create({
      username,
      email,
      password,
    });

    generateTokenAndSetCookie(res, user._id);

    // 5. Success Response (201 is the standard for 'Created')
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // 6. Error Handling: Ensure the request doesn't hang on failure
    console.error("Registration Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    // 1. Destructure the combined identifier (email or username) and password
    const { identifier, password } = req.body;

    // Log for debugging - this will now show the single input value
    console.log("Login attempt:", identifier);

    // 2. Search for the user in the database
    // The $or operator checks if the identifier matches either the email OR the username field
    // We explicitly .select("+password") because it's hidden by default in our Schema
    const user = await userModel
      .findOne({
        $or: [{ email: identifier }, { username: identifier }],
      })
      .select("+password");

    // 3. Security: If no user is found, stop and return an error
    // Always use 'return' to prevent the code from continuing to the password check
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials", // Keep messages vague for security
      });
    }

    // 4. Verify Password
    // Compares the plain-text password from req.body with the hashed password in DB
    const isMatch = await user.comparePassword(password);

    // 5. If passwords don't match, return the same error message as step 3
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  generateTokenAndSetCookie(res, user._id);
    // 6. Success Response
    // We send back a success flag and user details (but NEVER the password)
    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.username}!`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // 7. Error Handling
    // Catch-all for database connection issues or server crashes
    console.error("Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const logOut = async (req, res) => {
  try {
    // 1. Target the 'token' cookie specifically
    res.clearCookie("token", {
      httpOnly: true,
      // Helps prevent CSRF attacks
      sameSite: "strict",
      // Only set to true if you're on HTTPS (Production)
    });

    return res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error during logout" 
    });
  }
};