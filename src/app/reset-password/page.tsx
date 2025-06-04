"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/reset-password", {
        token,
        password,
      });
      toast.success("Password reset successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700/40 bg-gradient-to-br from-gray-900 to-gray-800/60 p-8 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6 tracking-tight">
          {loading ? "Resetting..." : "Reset Your Password"}
        </h1>

        <div className="space-y-5">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-slate-400">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-slate-100 border border-gray-700/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-400">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-slate-100 border border-gray-700/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            onClick={handleResetPassword}
            disabled={loading || !password || !confirmPassword}
            className={`w-full py-2 px-4 rounded-lg font-semibold tracking-tight transition shadow-md flex justify-center items-center gap-2 ${
              loading || !password || !confirmPassword
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110"
            }`}
          >
            {loading ? "Resetting..." : "Set New Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
