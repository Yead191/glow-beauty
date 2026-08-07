import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as analyticsService from "../../../services/analyticsService";
import StatCard from "../../../components/cards/StatCard";
import Spinner from "../../../components/loaders/Spinner";
import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle2,
  Truck,
} from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const res = await analyticsService.getDashboardAnalytics();
        setData(res);
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, []);

  if (loading) {
    return <Spinner text="Loading CRM analytics dashboard..." />;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">
            Delivered
          </span>
        );
      case "Processing":
        return (
          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-[11px] font-bold">
            Processing
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[11px] font-bold">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-dark to-rose-950 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-serif text-3xl font-bold">
            CRM Executive Dashboard
          </h2>
          <p className="text-gray-300 text-sm">
            Real-time store overview, customer analytics, and inventory
            monitoring.
          </p>
        </div>
        <Link
          to="/dashboard/products"
          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-full transition-all shadow-md shrink-0"
        >
          + Add New Product
        </Link>
      </div>

      {/* 5 Primary Requirement Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Customers"
          value={data?.totalCustomers || 0}
          icon={Users}
          color="rose"
        />
        <StatCard
          title="Total Products"
          value={data?.totalProducts || 0}
          icon={Package}
          color="purple"
        />
        <StatCard
          title="Total Orders"
          value={data?.totalOrders || 0}
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Sales"
          value={`৳${(data?.totalSales || 0).toFixed(2)}`}
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Low Stock Alert"
          value={data?.lowStockCount || 0}
          icon={AlertTriangle}
          color="amber"
          subtitle="Stock ≤ 5 units"
        />
      </div>

      {/* Low Stock Warning Banner if any */}
      {data?.lowStockProducts && data.lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 animate-bounce" />
            <div>
              <h4 className="font-bold text-sm text-amber-900">
                {data.lowStockProducts.length} Product(s) Require Inventory
                Restock!
              </h4>
              <p className="text-xs text-amber-700">
                {data.lowStockProducts
                  .map((p) => `${p.name} (${p.stock} left)`)
                  .join(", ")}
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/products"
            className="text-xs font-bold text-amber-900 underline hover:text-amber-950"
          >
            Update Stock
          </Link>
        </div>
      )}

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-gray-400">
              Latest transactions processed
            </p>
          </div>
          <Link
            to="/dashboard/orders"
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            View All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold text-gray-400 uppercase border-b border-gray-100">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {data?.recentOrders?.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-gray-400 text-xs"
                  >
                    No orders recorded yet.
                  </td>
                </tr>
              ) : (
                data?.recentOrders?.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-rose-50/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-gray-800">
                      #{order._id.substring(order._id.length - 8)}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {order.userId?.name || "Customer"}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-semibold">
                      {order.products?.reduce((s, i) => s + i.quantity, 0)}{" "}
                      items
                    </td>
                    <td className="py-3 px-4 font-bold text-rose-600">
                      ৳{order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
