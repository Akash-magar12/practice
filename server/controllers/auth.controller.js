import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  console.log(req.cookies);
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token",token)

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
    // 1. Destructure login data from the request body
    const { email, password, username } = req.body;

    // 2. Search for the user by Email OR Username
    // .select('+password') is used because 'select: false' is set in the Schema
    const user = await userModel
      .findOne({
        $or: [{ email }, { username }],
      })
      .select("+password");

    // 3. Check if user exists
    // IMPORTANT: You must use 'return' here so the code stops if the user is null
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 4. Compare the provided password with the hashed password in the DB
    // This calls the custom method we added to the userSchema
    const isMatch = await user.comparePassword(password);

    // 5. If passwords don't match, stop and send an error
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 6. Success! Send back the user data (excluding the password)
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
    // 7. Catch block to handle unexpected server or database errors
    console.error("Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
