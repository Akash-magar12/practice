import { postModel } from "../models/post.model.js";
import uploadFile from "../services/storage.service.js";

export const createPost = async (req, res) => {
  try {
    const { title } = req.body;
    // 1. Validation: Ensure a file was actually picked in Postman
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 2. Call your service function using the buffer
    const result = await uploadFile(req.file.buffer);

    const posts = await postModel.create({
      title,
      imageUrl: result.url,
    });

    // 3. Send back the success response
    res.status(200).json({
      success: true,
      message: "Upload successful!",
      posts,
    });
  } catch (error) {
    console.error("ImageKit Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getPost = async(req,res)=>{
    try {
      const posts = await postModel.find()
      res.status(200).json({
        message: 'all post fetched',
        posts
      })
    } catch (error) {
        console.log(error)
    }
}