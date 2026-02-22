import express from "express";
import multer from "multer";
import { createPost, getPost } from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; // 1. Import your middleware

const router = express.Router();

// Setup Multer to use Memory (Buffer)
const upload = multer({ storage: multer.memoryStorage() });

// 2. Protect the "Create" route
// Order: Auth Check -> Image Processing -> Controller Logic
router.post("/create", authMiddleware, upload.single("image"), createPost);

// 3. Protect the "Get" route
// Only logged-in users can see posts
router.get("/posts", authMiddleware, getPost);

export default router;