import express from "express";
import multer from "multer";
import { createPost, getPost } from "../controllers/post.controller.js";

const router = express.Router();

// Setup Multer to use Memory (Buffer)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", upload.single("image"), createPost);
router.get("/post", getPost);

export default router;
