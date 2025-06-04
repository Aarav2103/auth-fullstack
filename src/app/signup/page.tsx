"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        if (!validateEmail(user.email)) {
          toast.error("Please enter a valid email address");
          return;
        }
      
        const passwordError = validatePassword(user.password);
        if (passwordError) {
          toast.error(passwordError);
          return;
        }
      
        try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup success", response.data);
          router.push("/login");
        } catch (error: any) {
          console.log("Signup failed", error.message);
          toast.error(error.response?.data?.message || error.message);
        } finally {
          setLoading(false);
        }
      };
      

      
      function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      

    function validatePassword(password: string): string | null {
        const minLength = 8;
        if (password.length < minLength) {
          return `Password must be at least ${minLength} characters`;
        }
        if (!/[A-Z]/.test(password)) {
          return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
          return "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(password)) {
          return "Password must contain at least one number";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          return "Password must contain at least one special character";
        }
        return null; // Valid password
      }
      

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4">
  <div className="w-full max-w-md rounded-2xl border border-gray-700/40 bg-gradient-to-br from-gray-900 to-gray-800/60 p-8 shadow-xl backdrop-blur">
    <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6 tracking-tight">
      {loading ? "Processing..." : "Sign Up"}
    </h1>

    <div className="space-y-5">
      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-slate-400">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
          className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-slate-100 border border-gray-700/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-slate-100 border border-gray-700/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Password */}
      <div>
  <label htmlFor="password" className="block text-sm font-medium text-slate-400">
    Password
  </label>
  <input
    id="password"
    type="password"
    value={user.password}
    onChange={(e) => setUser({ ...user, password: e.target.value })}
    placeholder="Enter password"
    className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-slate-100 border border-gray-700/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
  <p className="mt-1 text-xs text-slate-500">
    Must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character.
  </p>
</div>

      {/* Button */}
      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`w-full py-2 px-4 rounded-lg font-semibold tracking-tight transition shadow-md ${
          buttonDisabled
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110"
        }`}
      >
        {buttonDisabled ? "Fill all fields" : "Sign Up"}
      </button>
    </div>

    {/* Link */}
    <p className="mt-6 text-sm text-center text-slate-400">
      Already have an account?{" "}
      <Link href="/login" className="text-blue-400 hover:underline">
        Login here
      </Link>
    </p>
  </div>
</div>

    
    );
}
