import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://library-management-systen.vercel.app/api/user/register",
        formData,
      );

      console.log(response.data);

      setSuccess("Account created successfully!");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Registration failed. Please try again.",
        );
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f3] flex items-center justify-center px-6 py-12">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-40"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex bg-black text-white p-12 flex-col justify-between">
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center text-xl font-bold">
                L
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Libra<span className="text-green-400">Tech</span>
                </h1>

                <p className="text-[10px] text-gray-400 tracking-widest uppercase">
                  Library Management
                </p>
              </div>
            </Link>

            {/* Content */}
            <div className="mt-24">
              <p className="text-green-400 font-semibold uppercase tracking-widest text-sm">
                Welcome to LibraTech
              </p>

              <h2 className="text-5xl font-bold leading-tight mt-4">
                Manage your library
                <span className="text-orange-300"> smarter.</span>
              </h2>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Create your account and get access to a modern platform designed
                to simplify books, members, borrowing and returns.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                ✓
              </div>

              <span className="text-gray-300">Easy book management</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                ✓
              </div>

              <span className="text-gray-300">Manage library members</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                ✓
              </div>

              <span className="text-gray-300">Track books and returns</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-8 sm:p-12 lg:p-14">
          {/* Mobile Logo */}
          <div className="md:hidden mb-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold text-xl">
                L
              </div>

              <h1 className="text-2xl font-bold">
                Libra<span className="text-green-600">Tech</span>
              </h1>
            </Link>
          </div>

          {/* Heading */}
          <div>
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest">
              Get Started
            </p>

            <h2 className="text-4xl font-bold mt-2">Create your account</h2>

            <p className="text-gray-500 mt-3">
              Join LibraTech and start managing your library.
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
              Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Account Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition bg-white"
              >
                <option value="">Select your role</option>
                <option value="user">user</option>
                <option value="librarian">Librarian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition"
              />

              <p className="text-xs text-gray-400 mt-2">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 accent-green-600"
              />

              <p className="text-gray-500">
                I agree to the{" "}
                <span className="text-green-600 font-medium cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-green-600 font-medium cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 disabled:bg-gray-400 transition duration-300 shadow-lg shadow-green-600/20"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          {/* Login */}
          <div className="text-center mt-8 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-bold hover:text-green-700"
            >
              Login
            </Link>
          </div>

          {/* Back Home */}
          <div className="text-center mt-5">
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
