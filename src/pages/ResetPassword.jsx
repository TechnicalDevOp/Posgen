import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authSlice";
import { FiLock } from "react-icons/fi";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    setValidationError("");
    dispatch(resetPassword({ password }));
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
          Create New Password
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter and confirm your new password
        </p>

        {/* Card */}
        <div className="bg-[#111827] rounded-2xl shadow-lg p-6">
          <div className="flex justify-center mb-4">
            <FiLock size={40} className="text-blue-400" />
          </div>

          <h3 className="text-center text-lg font-semibold mb-2">
            Reset Password
          </h3>
          <p className="text-center text-gray-400 text-sm mb-4">
            Your new password must be different from your old password.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#0a0a0f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="block text-sm mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#0a0a0f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-semibold"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* Validation & Feedback */}
          {validationError && (
            <p className="text-red-400 text-center mt-3">{validationError}</p>
          )}
          {success && (
            <p className="text-green-400 text-center mt-3">
              ✅ Password reset successful! You can now sign in.
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

export default ResetPassword;
