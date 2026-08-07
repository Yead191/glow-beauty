import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as orderService from "../../../services/orderService";
import Spinner from "../../../components/loaders/Spinner";
import {
  PackageCheck,
  Clock,
  CheckCircle2,
  Truck,
  ShoppingBag,
  MapPin,
  Calendar,
} from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getMyOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching order history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <Spinner text="Loading your order history..." />;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
            <Truck className="w-3.5 h-3.5 animate-pulse" />
            Processing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
          Order History
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track status and review details of your beauty purchases
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-gray-800">
            No Orders Placed Yet
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            When you place orders, they will appear here with live tracking.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-200 transition-all"
          >
            Start Shopping Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-rose-100/60 p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Order Header info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Order #{order._id.substring(order._id.length - 8)}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-gray-400 block font-semibold uppercase">
                    Total Amount
                  </span>
                  <span className="font-serif text-2xl font-bold text-rose-600">
                    ৳{order.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.products.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gray-50/70 p-3 rounded-2xl border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl bg-white border border-gray-100 shrink-0"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800";
                      }}
                    />
                    <div className="truncate">
                      <p className="font-semibold text-xs text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {item.quantity} x ৳{item.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping info */}
              <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>
                  <strong className="text-gray-700">Delivery Address:</strong>{" "}
                  {order.shippingAddress} ({order.phone})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
