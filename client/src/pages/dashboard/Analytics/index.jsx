import React, { useState, useEffect } from "react";
import * as analyticsService from "../../../services/analyticsService";
import StatCard from "../../../components/cards/StatCard";
import Spinner from "../../../components/loaders/Spinner";
import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await analyticsService.getDashboardAnalytics();
        setData(res);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Spinner text="Calculating store analytics and revenue figures..." />
    );
  }

  const categoryCounts = data?.categoryCounts || {};
  const totalCategoryProducts =
    Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Analytics & Revenue Metrics
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Deep dive into sales performance, customer growth, and category trends
        </p>
      </div>

      {/* Required Analytics Metric Cards */}
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
          title="Total Revenue"
          value={`৳${(data?.totalSales || 0).toFixed(2)}`}
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Low Stock Alert"
          value={data?.lowStockCount || 0}
          icon={AlertTriangle}
          color="amber"
        />
      </div>

      {/* Category Breakdown & Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown Progress */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-rose-500" />
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Catalog Category Distribution
              </h3>
            </div>
            <span className="text-xs font-semibold text-gray-400">
              by Product Count
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(categoryCounts).map(([catName, count]) => {
              const percentage = Math.round(
                (count / totalCategoryProducts) * 100,
              );
              return (
                <div key={catName} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-800">{catName}</span>
                    <span className="text-rose-600 font-bold">
                      {count} items ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-pink-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sales Performance Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Revenue Highlights
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Live Real-Time
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Gross Sales Revenue
                </p>
                <h4 className="font-serif text-3xl font-bold text-rose-600">
                  ৳{(data?.totalSales || 0).toFixed(2)}
                </h4>
              </div>
              <DollarSign className="w-10 h-10 text-rose-300" />
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Average Order Value (AOV)
                </p>
                <h4 className="font-serif text-3xl font-bold text-blue-700">
                  ৳
                  {data?.totalOrders > 0
                    ? (data.totalSales / data.totalOrders).toFixed(2)
                    : "0.00"}
                </h4>
              </div>
              <BarChart3 className="w-10 h-10 text-blue-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
