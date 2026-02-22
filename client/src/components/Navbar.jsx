import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/userSlice";
import toast from "react-hot-toast";
import { FiPlus, FiLogOut, FiUser, FiMenu } from "react-icons/fi";
import api from "../utils/api";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleLogout = async () => {
    try {
      // 1. Tell the server to clear the cookie
      await api.post("/auth/logout"); 

      // 2. Wipe the Redux state (and LocalStorage via Persist)
      dispatch(logout());

      toast.success("See you soon!");
      
      // 3. Kick them back to the Home/Hero page
      navigate("/"); 
    } catch (error) {
      console.log(error)
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mr-3 group-hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              MERN<span className="text-indigo-600">Notes</span>
            </span>
          </Link>

          {/* Right Side: Auth Logic */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              /* --- LOGGED IN VIEW --- */
              <div className="flex items-center space-x-3 md:space-x-6">
                {/* Create Post Action Button */}
                <Link 
                  to="/create-post" 
                  className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  <FiPlus className="stroke-[3]" />
                  <span>Create Post</span>
                </Link>

                {/* User Info & Logout Divider */}
                <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end leading-tight">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Creator</span>
                    <span className="text-sm font-bold text-gray-700">{user?.username}</span>
                  </div>
                  
                  {/* Simple Avatar Placeholder */}
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 border border-gray-200">
                    <FiUser />
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              /* --- GUEST VIEW --- */
              <div className="flex items-center space-x-2 md:space-x-5">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-900 font-bold text-sm px-3 py-2 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            )}

            {/* Mobile Menu (Visible only on small screens) */}
            <button className="md:hidden p-2 text-gray-600">
              <FiMenu size={24} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;