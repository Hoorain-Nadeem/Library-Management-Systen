import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData,
        {
          withCredentials: true,
        },
      );

      console.log("LOGIN RESPONSE:", response.data);
   if(response.data.user.role === "user"){
  navigate("/user");
   }else{
    navigate("/admin");
   }
      // Go to profile
    
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      if (error.response) {
        setError(error.response.data.message || "Invalid email or password");
      } else {
        setError("Unable to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f3] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden md:flex bg-black text-white p-12 flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center">
                <span className="text-black font-bold text-xl">L</span>
              </div>

              <h1 className="text-2xl font-bold">
                Libra<span className="text-green-400">Tech</span>
              </h1>
            </div>

            <p className="text-green-400 font-semibold uppercase tracking-widest text-sm mb-4">
              Library Management System
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Welcome
              <br />
              Back.
            </h2>

            <p className="text-gray-400 leading-relaxed max-w-md">
              Sign in to manage your library account, check your borrowed books,
              and stay connected with LibraTech.
            </p>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              Smart Library. Simple Management.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12 lg:p-14">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
              <span className="text-black font-bold text-lg">L</span>
            </div>

            <h1 className="text-xl font-bold">
              Libra<span className="text-green-600">Tech</span>
            </h1>
          </div>

          <div className="mb-8">
            <p className="text-green-600 font-semibold text-sm mb-2">
              ACCOUNT LOGIN
            </p>

            <h2 className="text-3xl font-bold text-black mb-3">
              Sign in to your account
            </h2>

            <p className="text-gray-500">
              Enter your details to continue to LibraTech.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-semibold text-green-600 hover:text-green-700"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-black text-white font-semibold hover:bg-green-600 hover:text-black transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Signup */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Back Home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-black transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
