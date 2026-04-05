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
        <div className="max-w-4xl mx-auto px-2 sm:px-3 md:px-4">

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                📦 My Orders
            </h2>

            {/* Empty State */}
            {orders.length === 0 && (
                <div className="text-center text-gray-500 text-base">
                    No orders found
                </div>
            )}

            {/* Orders List */}
            <div className="flex flex-col gap-3">
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        className="border p-3 rounded-lg shadow-sm hover:shadow transition cursor-pointer bg-white"
                        onClick={() => navigate(`/orders/${order.orderId}`)}
                    >
                        {/* 🔹 TOP */}
                        <div className="flex justify-between items-start gap-2">

                            {/* Left */}
                            <div>
                                <p className="font-semibold text-base sm:text-lg">
                                    #{order.orderId}
                                </p>

                                <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded mt-0.5">
                                    {order.ref}
                                </span>
                            </div>

                            {/* Right */}
                            <StatusBadge status={order.status} />
                        </div>

                        {/* 🔹 DETAILS */}
                        <div className="mt-2 flex justify-between items-center text-sm sm:text-base">
                            <p className="font-semibold text-green-600">
                                ₹ {order.total}
                            </p>

                            <p className="text-gray-500 text-xs sm:text-sm">
                                {new Date(order.date).toLocaleString()}
                            </p>
                        </div>

                        {/* 🔹 CTA */}
                        <div className="mt-1 text-right">
                            <span className="text-sm text-blue-500 hover:underline">
                                View →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}