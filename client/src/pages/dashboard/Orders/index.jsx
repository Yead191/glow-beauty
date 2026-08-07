import React, { useState, useEffect } from "react";
import * as orderService from "../../../services/orderService";
import Spinner from "../../../components/loaders/Spinner";
import {
  ShoppingBag,
  RefreshCw,
  CheckCircle2,
  Truck,
  Clock,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAllOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching admin orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Order Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review orders and update fulfillment status
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 font-semibold text-xs rounded-full shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Table
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <Spinner text="Loading orders list..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase border-b border-gray-100">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-4">Customer Details</th>
                  <th className="py-4 px-4">Items Summary</th>
                  <th className="py-4 px-4">Total Payable</th>
                  <th className="py-4 px-6">Update Status</th>
                  <th className="py-4 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-400 text-xs"
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-rose-50/20 transition-colors"
                    >
                      <td className="py-4 px-6 font-mono text-xs font-bold text-gray-900">
                        #{order._id.substring(order._id.length - 8)}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-900">
                          {order.userId?.name || "Customer"}
                        </p>
                        <p className="text-xs text-gray-500">{order.phone}</p>
                        <p className="text-[11px] text-gray-400 max-w-xs truncate">
                          {order.shippingAddress}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {order.products?.map((p, i) => (
                            <p
                              key={i}
                              className="text-xs text-gray-700 font-medium truncate max-w-xs"
                            >
                              {p.quantity}x {p.name} (${p.price})
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-serif font-bold text-base text-rose-600">
                        ৳{order.totalPrice?.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border focus:outline-none cursor-pointer ${
                            order.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : order.status === "Processing"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
