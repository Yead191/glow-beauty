import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  Sparkles,
  LogIn,
  Lock,
  Mail,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import Spinner from "../../../components/loaders/Spinner";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      const loggedUser = await loginUser({ email, password });
      if (loggedUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password credentials",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail("admin@glowbeauty.com");
    setPassword("admin123");
  };

  const fillDemoCustomer = () => {
    setEmail("borsha@gmail.com");
    setPassword("customer123");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-rose-100 shadow-xl space-y-8">
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-rose-300 flex items-center justify-center text-white mx-auto shadow-md shadow-rose-200">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-xs text-gray-500">
            Sign in to access your GlowBeauty account
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-100 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-700 text-center">
            Quick Demo Login Shortcuts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={fillDemoCustomer}
              className="py-1.5 px-3 bg-white text-rose-700 text-xs font-bold rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="py-1.5 px-3 bg-brand-dark text-amber-300 text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
              Demo Admin CRM
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <Spinner size="sm" text="Authenticating..." />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-rose-600 hover:underline"
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
