import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/slices/orderSlice";
import api from "../api/axios";
import { Loader2 } from "lucide-react";

const statusOptions = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrders() {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.patch(`/orders/${orderId}/status`, {
                status: newStatus,
            });

            dispatch(fetchOrders()); // refresh list
        } catch (err) {
            console.error(err);
        }
    };

   /*  if (loading) return <p>Loading...</p>; */
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh]">

                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />

                <p className="mt-3 text-gray-600 font-medium">
                    Loading orders...
                </p>

            </div>
        );
    }

    return (
        <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
                📦 Admin - Orders Management
            </h2>

            {/* ✅ DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Order ID</th>
                            <th className="p-3">User</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.orderId}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="p-3 font-semibold">
                                    #{order.orderId}
                                </td>

                                <td className="p-3">
                                    User {order.userId}
                                </td>

                                <td className="p-3 text-green-600 font-medium">
                                    ₹ {order.total}
                                </td>

                                <td className="p-3">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order.orderId,
                                                e.target.value
                                            )
                                        }
                                        className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="p-3 text-gray-500">
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ MOBILE CARDS */}
            <div className="md:hidden flex flex-col gap-4">
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        className="bg-white border border-amber-400  shadow rounded-xl p-4"
                    >
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">
                                #{order.orderId}
                            </span>
                            <span className="text-green-600 font-bold">
                                ₹ {order.total}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-1">
                            👤 User: {order.userId}
                        </p>

                        <p className="text-sm text-gray-500 mb-2">
                            📅 {new Date(order.date).toLocaleDateString()}
                        </p>

                        <div>
                            <label className="text-xs text-gray-500 block mb-1">
                                Status
                            </label>

                            <select
                                value={order.status}
                                onChange={(e) =>
                                    handleStatusChange(
                                        order.orderId,
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded px-2 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}