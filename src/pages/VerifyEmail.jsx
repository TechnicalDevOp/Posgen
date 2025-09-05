import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../features/auth/authSlice";
import { FiMail } from "react-icons/fi";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      return;
    }
    dispatch(verifyEmail(otp));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-white">
      <div className="w-full max-w-md p-6">
        {/* Back */}
        <p
          onClick={() => window.history.back()}
          className="text-sm text-gray-400 cursor-pointer mb-6 hover:text-gray-200"
        >
          ← Back
        </p>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-purple-400 mb-2">
          Verify Email
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* Card */}
        <div className="bg-[#111827] rounded-2xl shadow-lg p-6">
          <div className="flex justify-center mb-4">
            <FiMail size={40} className="text-blue-400" />
          </div>

          <h3 className="text-center text-lg font-semibold mb-2">
            Enter OTP Code
          </h3>
          <p className="text-center text-gray-400 text-sm mb-4">
            We’ve sent a 6-digit code to your email address.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm mb-2">OTP Code</label>
            <input
              type="text"
              maxLength={6}
              className="w-full tracking-widest text-center text-xl px-4 py-2 rounded-lg bg-[#0a0a0f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-semibold"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          {/* Feedback */}
          {success && (
            <p className="text-green-400 text-center mt-3">
              ✅ Email verified successfully!
            </p>
          )}
          {error && <p className="text-red-400 text-center mt-3">{error}</p>}

          <p className="text-center text-gray-400 mt-6">
            Didn’t receive a code?{" "}
            <a href="/resend-otp" className="text-blue-400 hover:underline">
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

