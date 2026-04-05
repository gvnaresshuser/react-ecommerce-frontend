import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

export default function Orders() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    // ✅ Loading UI
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-lg font-semibold animate-pulse">
                    Loading orders...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-3 sm:p-4 md:p-6">

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
                📦 My Orders
            </h2>

            {/* Empty State */}
            {orders.length === 0 && (
                <div className="text-center text-gray-500">
                    <p>No orders found</p>
                </div>
            )}

            {/* Orders List */}
            <div className="flex flex-col gap-4">
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        className="border p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer bg-white"
                        onClick={() => navigate(`/orders/${order.orderId}`)}
                    >
                        {/* 🔹 TOP ROW */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

                            {/* Left */}
                            <div>
                                <p className="font-semibold text-sm sm:text-base">
                                    Order ID: #{order.orderId}
                                </p>

                                <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mt-1">
                                    Ref: {order.ref}
                                </span>
                            </div>

                            {/* Right */}
                            <div className="flex items-center justify-between sm:justify-end gap-3">
                                <StatusBadge status={order.status} />
                            </div>
                        </div>

                        {/* 🔹 DETAILS */}
                        <div className="mt-3 text-sm sm:text-base">
                            <p className="font-medium text-green-600">
                                ₹ {order.total}
                            </p>

                            <p className="text-gray-500 text-xs sm:text-sm">
                                {new Date(order.date).toLocaleString()}
                            </p>
                        </div>

                        {/* 🔹 CTA */}
                        <div className="mt-3 text-right">
                            <span className="text-sm text-blue-500 font-medium hover:underline">
                                View Details →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}