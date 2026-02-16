import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    identifier: "",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              value={form.identifier}
              onChange={handleChange}
              name="identifier"
              placeholder="jolly_dev or jolly@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={form.password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          <div className="flex items-center justify-end">
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 transform active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
