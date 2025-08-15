import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  MessageSquare,
  User,
  UserLock,
} from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "@/components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="grid min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-gray-100 lg:grid-cols-[55%_45%]">
      {/* left side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-md">
          {/* LOGO */}
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <div className="bg-primary/25 group-hover:bg-primary/35 shadow-primary/25 flex size-12 items-center justify-center rounded-xl shadow-lg transition-all duration-300">
                <MessageSquare className="text-primary size-6" />
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-wide">
                Create Account
              </h1>
              <p className="text-sm text-gray-400">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-200">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                  <User className="size-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  className="input input-bordered focus:border-primary focus:ring-primary/50 w-full border-zinc-700 bg-zinc-900/70 pl-12 text-gray-100 transition-all placeholder:text-zinc-500 focus:ring-2"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-200">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                  <Mail className="size-5 text-gray-300" />
                </div>
                <input
                  type="email"
                  className="input input-bordered focus:border-primary focus:ring-primary/50 w-full border-zinc-700 bg-zinc-900/70 pl-12 text-gray-100 transition-all placeholder:text-zinc-500 focus:ring-2"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-200">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                  <UserLock className="size-5 text-gray-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered focus:border-primary focus:ring-primary/50 w-full border-zinc-700 bg-zinc-900/70 pl-12 text-gray-100 transition-all placeholder:text-zinc-500 focus:ring-2"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 z-10 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-300" />
                  ) : (
                    <Eye className="size-5 text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl font-semibold shadow-md transition-all hover:shadow-lg hover:brightness-110"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-300 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;
