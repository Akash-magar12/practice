import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import api from "../utils/api";
import toast from "react-hot-toast";
import { loginStart, loginSuccess, loginFailure } from "../redux/features/userSlice"; // Using your new actions

const Login = () => {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const dispatch = useDispatch();
  
  // 1. Get the global loading state from Redux
  // 'state.auth' matches the name you gave the reducer in your store
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Start the login process in Redux (sets loading: true)
    dispatch(loginStart());

    try {
      const response = await api.post("/auth/login", form);

      // 3. Success! Store user and set isAuthenticated: true
      dispatch(loginSuccess(response.data.user));
      
      toast.success(response.data.message);
      console.log(response.data);

    } catch (error) {
      // 4. Failure! Reset loading and isAuthenticated to false
      dispatch(loginFailure());
      
      const errorMsg = error.response?.data?.message || "Login failed";
      toast.error(errorMsg);
      console.log(error);
    }
    // Note: No need for 'finally' here because loginSuccess and loginFailure 
    // both set loading to false automatically in your Redux Slice!
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
            <input
              type="text"
              value={form.identifier}
              onChange={handleChange}
              name="identifier"
              placeholder="jolly_dev or jolly@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={handleChange}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading} 
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 transform active:scale-[0.98] ${
              loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
          >
            {/* The UI now reacts to the Global Redux loading state */}
            {loading ? "Processing..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;