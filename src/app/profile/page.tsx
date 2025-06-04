"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error) {
      toast.error("Failed to fetch user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700/40 bg-gradient-to-br from-gray-900 to-gray-800/60 p-8 shadow-xl backdrop-blur text-center space-y-6">
        <h1 className="text-3xl font-bold text-slate-200 tracking-tight">👤 Profile</h1>

        <p className="text-slate-400">Welcome to your profile page</p>

        <div>
          <h2 className="text-sm text-slate-400 mb-2">User ID</h2>
          {data === "nothing" ? (
            <div className="text-sm text-yellow-500">Not fetched yet</div>
          ) : (
            <Link
              href={`/profile/${data}`}
              className="text-green-400 font-mono text-sm break-all hover:underline"
            >
              {data}
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={getUserDetails}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            🔍 Get User Details
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
