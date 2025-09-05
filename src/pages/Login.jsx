import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../features/auth/authSlice'
import { IoArrowBack } from "react-icons/io5";
import { FaUser, FaBuilding } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const [accountType, setAccountType] = useState("customer"); // "customer" | "business"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, accountType }));
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Back link */}
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 mb-6"
        >
          <IoArrowBack /> Back to QueueBid
        </a>

        {/* Header */}
        <h1 className="text-center text-3xl font-bold text-purple-400">Welcome Back</h1>
        <p className="text-center text-gray-400 mt-1">Sign in to your QueueBid account</p>

        {/* Card */}
        <div className="mt-6 bg-[#111827] rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold">Login</h2>
          <p className="text-sm text-gray-400 mt-1 mb-4">
            Choose your account type to continue
          </p>

          {/* Tabs */}
          <div className="flex bg-[#0f1623] rounded-md overflow-hidden mb-5">
            <button
              type="button"
              onClick={() => setAccountType("customer")}
              className={`flex-1 flex items-center justify-center py-2 transition ${
                accountType === "customer"
                  ? "bg-black text-white"
                  : "text-gray-300"
              }`}
            >
              <FaUser className="mr-2" /> Customer
            </button>
            <button
              type="button"
              onClick={() => setAccountType("business")}
              className={`flex-1 flex items-center justify-center py-2 transition ${
                accountType === "business"
                  ? "bg-black text-white"
                  : "text-gray-300"
              }`}
            >
              <FaBuilding className="mr-2" /> Business
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#0a0a0f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#0a0a0f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center -mb-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : accountType === "customer"
                ? "Sign In as Customer"
                : "Sign In as Business"}
            </button>
          </form>

          {/* Links under button */}
          <div className="mt-4 text-center">
            <a href="/forgotpassword" className="text-blue-400 hover:underline">
              Forgot your password?
            </a>
          </div>
          <p className="text-center text-gray-400 mt-3">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
