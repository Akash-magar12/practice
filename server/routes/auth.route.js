import express from "express";
import { userModel } from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
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

    // 5. Success Response (201 is the standard for 'Created')
    res.status(201).json({
      success: true,
      message: "User registered successfully",
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
});

export default router;
