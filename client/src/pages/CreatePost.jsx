import React, { useState } from "react";
import { FiImage, FiType, FiUploadCloud, FiInfo } from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";

const CreatePost = () => {
  // --- 1. STATE INITIALIZATION ---
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);    // Binary data for the server (Multipart/form-data)
  const [preview, setPreview] = useState(""); // Temporary string URL for the <img> tag

  // --- 2. IMAGE SELECTION HANDLER ---
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; 

    if (selectedFile) {
      // PRO-TIP: Revoke the old URL to prevent memory leaks in the browser
      if (preview) URL.revokeObjectURL(preview);

      setFile(selectedFile);

      // Creates a temporary "blob" link that points to the file in your RAM
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      console.log("File ready for upload:", selectedFile.name);
    }
  };

  // --- 3. FORM SUBMISSION ---
 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!title || !file) {
    return toast.error("Please provide both a title and an image!");
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", file);

  setLoading(true);
  try {
    const response = await api.post("/post/create", formData);
    toast.success(response.data.message);

    // --- RESET FORM STATE HERE ---
    setTitle("");        // Clear the text input
    setFile(null);       // Clear the binary file
    
    if (preview) {
      URL.revokeObjectURL(preview); // Free up browser memory
      setPreview("");    // Clear the UI image preview
    }

    // Optional: If you want to stay on the page, the form is now empty.
    // If you want to leave, use: navigate("/");
    
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        {/* Visual Header */}
        <div className="bg-indigo-600 p-8 text-white text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">New Post</h2>
          <p className="text-indigo-100 mt-2 text-sm opacity-90">
            Upload your post to the cloud.
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Title Input Area */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-widest">
              <FiType className="mr-2 text-indigo-500" /> Post Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter a descriptive title..."
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-gray-400 text-gray-700 font-medium"
            />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-3">
            <span className="text-sm font-bold text-gray-700 uppercase">
              Upload Image
            </span>
            
            {/* THE PROXY CLICK LOGIC:
                Clicking this <label> automatically clicks the hidden <input> inside it.
            */}
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-gray-50 overflow-hidden relative">
              {preview ? (
                /* State-based UI: If preview URL exists, show the image */
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* State-based UI: If preview is empty, show the upload icon */
                <div className="flex flex-col items-center justify-center text-center px-4">
                  <FiUploadCloud className="w-10 h-10 text-indigo-500 mb-2" />
                  <span className="text-sm text-gray-500">
                    Click to select image
                  </span>
                </div>
              )}

              {/* The hidden worker: 
                  It's invisible, but it's the one that actually opens the file explorer.
              */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* User Tip */}
          <div className="flex gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Images will be processed via <strong>ImageKit</strong>.
            </p>
          </div>

          {/* Dynamic Action Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg transition-all ${
              loading ? "opacity-50 cursor-wait" : "hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {loading ? "Uploading to Cloud..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;