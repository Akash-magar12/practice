import express from "express";
import multer from "multer";
import uploadFile from "../services/storage.service.js";

const router = express.Router();

// Setup Multer to use Memory (Buffer)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", upload.single("image"), async (req, res) => {
    console.log("1. Request received");
  console.log("File info:", req.file);
  console.log("Body info:", req.body);
  try {
    // 1. Validation: Ensure a file was actually picked in Postman
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 2. Call your service function using the buffer
    const result = await uploadFile(req.file.buffer.toString('base64'));

    // 3. Send back the success response
    res.status(200).json({
      success: true,
      message: "Upload successful!",
      url: result.url,
      fileId: result.fileId
    });
  } catch (error) {
    console.error("ImageKit Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;