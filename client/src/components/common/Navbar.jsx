import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import {
  Home,
  Package,
  ShoppingBag,
  User,
  UserPlus,
  LogIn,
  LogOut,
  LayoutDashboard,
  Sparkles,
  Menu,
  X,
  Search,
  PackageCheck,
} from "lucide-react";

const Navbar = () => {
  const { user, logoutUser, isAdmin } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setUserDropdownOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", icon: Package },
  ];

  if (user) {
    navLinks.push({
      name: "My Orders",
      path: "/my-orders",
      icon: PackageCheck,
    });
  }

  return (
    <header className="sticky top-2 z-50  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="bg-white/85 backdrop-blur-xl border border-rose-100/80 shadow-lg shadow-rose-900/5 rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group pl-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-300/50 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-rose-600 transition-colors">
                  GlowBeauty
                </span>
                <span className="block text-[9px] tracking-[0.2em] uppercase text-rose-500 font-bold -mt-1">
                  Luxury Cosmetics
                </span>
              </div>
            </Link>

            {/* Desktop Pill-Shaped Navigation Links with Icons */}
            <div className="hidden md:flex items-center gap-1.5 bg-gray-100/70 p-1.5 rounded-full border border-gray-200/50 shadow-inner">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md shadow-rose-300/60 scale-[1.02]"
                        : "text-gray-600 hover:text-rose-600 hover:bg-white/80"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-white" : "text-rose-500"}`}
                    />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2.5">
              {/* Quick Search */}
              <Link
                to="/products"
                className="p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors hidden sm:flex"
                title="Search products"
              >
                <Search className="w-4.5 h-4.5" />
              </Link>

              {/* Shopping Cart Pill Badge */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-3.5 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors border border-gray-200/60 bg-gray-50/50"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-rose-600" />
                <span className="hidden sm:inline text-xs font-bold text-gray-800">
                  Bag
                </span>
                {totalCount > 0 && (
                  <span className="bg-gradient-to-r from-rose-600 to-pink-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* User Auth Controls */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-rose-50 border border-rose-200/80 transition-all focus:outline-none bg-white shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 text-white font-bold flex items-center justify-center text-xs shadow-inner">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:inline text-xs font-bold text-gray-800 max-w-[90px] truncate pr-1">
                      {user.name.split(" ")[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-xl border border-rose-100 py-2.5 z-50 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                        {isAdmin && (
                          <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                            Admin
                          </span>
                        )}
                      </div>

                      {isAdmin && (
                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-rose-500" />
                          CRM Dashboard
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        <User className="w-4 h-4 text-rose-500" />
                        My Profile & Tickets
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        <PackageCheck className="w-4 h-4 text-rose-500" />
                        Order History
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-rose-600 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5 text-rose-500" />
                    Sign In
                  </Link>

                  {/* Premium Pill Register Button */}
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 rounded-full shadow-md shadow-rose-300/50 hover:shadow-lg hover:shadow-rose-400/60 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-rose-400/30"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden text-gray-700 hover:text-rose-600 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl border border-rose-100/80 rounded-3xl p-4 shadow-xl space-y-2 animate-fade-in">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-rose-50"
                  }`}
                >
                  <Icon
                    className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-rose-500"}`}
                  />
                  {link.name}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-brand-dark text-amber-300 shadow-md"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to CRM Dashboard
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
