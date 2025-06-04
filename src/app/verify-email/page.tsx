"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700/40 bg-gradient-to-br from-gray-900 to-gray-800/60 p-8 shadow-xl backdrop-blur text-center">
        <h1 className="text-3xl font-bold text-slate-200 mb-4 tracking-tight">Verify Email</h1>

        <p className="text-sm text-slate-400 mb-6">
          {token ? "Verifying your email..." : "No token found in URL"}
        </p>

        {verified && (
          <div className="space-y-4">
            <div className="text-green-500 font-semibold text-lg">✅ Email successfully verified!</div>
            <Link
              href="/login"
              className="inline-block px-4 py-2 mt-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:brightness-110"
            >
              Proceed to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <div className="text-red-500 font-semibold text-lg">❌ Verification failed or token expired.</div>
            <p className="text-sm text-slate-400">
              You may request a new verification email from the signup page.
            </p>
            <Link
              href="/signup"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-lg hover:brightness-110"
            >
              Go to Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
