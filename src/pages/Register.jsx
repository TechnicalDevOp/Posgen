import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FaUser, FaBuilding } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

// Redux Thunk for register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState("customer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(registerUser({ ...formData, accountType }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d] text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Back to QueueBid */}
        <a href="/" className="flex items-center text-gray-400 text-sm hover:underline">
          <IoArrowBack className="mr-1" /> Back to QueueBid
        </a>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-400">Join QueueBid</h1>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        {/* Register Card */}
        <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Register</h2>
          <p className="text-sm text-gray-400 mb-4">Choose your account type to continue</p>

          {/* Tabs */}
          <div className="flex mb-6 space-x-2">
            <button
              onClick={() => setAccountType("customer")}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition ${
                accountType === "customer"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <FaUser className="mr-2" /> Customer
            </button>
            <button
              onClick={() => setAccountType("business")}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition ${
                accountType === "business"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <FaBuilding className="mr-2" /> Business
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-3">
              <div className="w-1/2">
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition"
            >
              {accountType === "customer" ? "Create Customer Account" : "Create Business Account"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


