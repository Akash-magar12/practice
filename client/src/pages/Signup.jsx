import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", form);
  };
  return (
    <div className="min-h-screen  from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">
            Join us to start managing your notes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={form.username}
              name="username"
              placeholder="jolly_dev"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jolly@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 transform active:scale-[0.98] mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
