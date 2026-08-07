import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  LifeBuoy,
  BarChart3,
  Sparkles,
  LogOut,
  Store,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
    { name: 'Products', path: '/dashboard/products', icon: Package },
    { name: 'Customers', path: '/dashboard/customers', icon: Users },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Support', path: '/dashboard/support', icon: LifeBuoy },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Fixed Sticky Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 h-screen bg-brand-dark text-white flex flex-col justify-between transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col min-h-0 flex-1">
          {/* Logo Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-rose-300 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  GlowCRM
                </span>
                <span className="block text-[9px] tracking-widest uppercase text-rose-400 font-bold -mt-1">
                  Admin Panel
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links (Scrollable if needed on low resolution) */}
          <nav className="p-4 space-y-1 overflow-y-auto flex-1 scrollbar-none">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Management Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-rose-600 text-white font-semibold shadow-md shadow-rose-900/40'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 shrink-0 bg-brand-dark">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-white/5 transition-colors"
          >
            <Store className="w-4 h-4" />
            View Live Website Store
          </Link>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between px-2">
            <div className="flex items-center gap-2 max-w-[140px] truncate">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-gray-400 uppercase">Admin</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area (Offset by lg:pl-64 to match fixed sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 hidden sm:block">
              GlowBeauty CRM Portal
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-rose-50 text-rose-700 font-semibold text-xs rounded-full border border-rose-100">
              Live System Active
            </span>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-6 bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
