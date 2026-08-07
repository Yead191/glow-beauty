import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  Sparkles,
  UserPlus,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  ShieldAlert,
} from "lucide-react";
import Spinner from "../../../components/loaders/Spinner";

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      const newUser = await registerUser({
        name,
        email,
        password,
        phone,
        address,
        role,
      });

      if (newUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check inputs.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl border border-rose-100 shadow-xl space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-rose-300 flex items-center justify-center text-white mx-auto shadow-md shadow-rose-200">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="text-xs text-gray-500">
            Join GlowBeauty for luxury skincare & cosmetic shopping
          </p>
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
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01*********"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm font-semibold bg-white"
              >
                <option value="customer">Customer (Store Buyer)</option>
                <option value="admin">Admin (CRM Manager)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Default Delivery Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <Spinner size="sm" text="Creating Account..." />
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Complete Registration
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-rose-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
