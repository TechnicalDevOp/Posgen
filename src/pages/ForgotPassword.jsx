import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendResetEmail } from '../features/auth/authSlice';
import { FiMail } from "react-icons/fi";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(sendResetEmail(email));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-white">
      <div className="w-full max-w-md p-6">
        {/* Back to login */}
        <p
          onClick={() => window.history.back()}
          className="text-sm text-gray-400 cursor-pointer mb-6 hover:text-gray-200"
        >
          ← Back to Login
        </p>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-purple-400 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter your email to reset your password
        </p>

        {/* Card */}
        <div className="bg-[#111827] rounded-2xl shadow-lg p-6">
          <div className="flex justify-center mb-4">
            <FiMail size={40} className="text-blue-400" />
          </div>

          <h3 className="text-center text-lg font-semibold mb-2">
            Forgot Password?
          </h3>
          <p className="text-center text-gray-400 text-sm mb-4">
            No worries, we’ll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#0a0a0f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-semibold"
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          {/* Feedback */}
          {success && (
            <p className="text-green-400 text-center mt-3">
              ✅ Reset instructions sent to your email.
            </p>
          )}
          {error && <p className="text-red-400 text-center mt-3">{error}</p>}

          <p className="text-center text-gray-400 mt-6">
            Remember your password?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
