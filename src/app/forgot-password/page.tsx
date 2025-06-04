"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/forgot-password", { email });
      toast.success("Password reset link sent to your email");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700/40 bg-gradient-to-br from-gray-900 to-gray-800/60 p-8 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6 tracking-tight">
          {loading ? "Sending link..." : "Forgot Password"}
        </h1>

        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-slate-100 border border-gray-700/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            onClick={handleForgotPassword}
            disabled={loading || email.trim() === ""}
            className={`w-full py-2 px-4 rounded-lg font-semibold tracking-tight transition shadow-md flex justify-center items-center gap-2 ${
              loading || !email
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
