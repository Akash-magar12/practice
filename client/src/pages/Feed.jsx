import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setFeeds } from "../redux/features/feedSlice";
import { FiImage, FiHeart, FiMessageCircle } from "react-icons/fi";

const Feed = () => {
  const dispatch = useDispatch();
  const { feeds } = useSelector((state) => state.feed);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await api.get("post/posts");
        // Update Redux store with the fetched posts
        dispatch(setFeeds(res.data.posts));
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (feeds.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <FiImage className="mx-auto text-gray-300 text-5xl mb-4" />
        <h3 className="text-xl font-bold text-gray-900">No posts yet</h3>
        <p className="text-gray-500">Be the first one to share something amazing!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Grid Layout: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {feeds.map((post) => (
          <div 
            key={post._id} 
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-snug">
                {post.title}
              </h3>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <button className="bg-black text-white px-3 py-2 rounded cursor-pointer">Save</button>
                
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;