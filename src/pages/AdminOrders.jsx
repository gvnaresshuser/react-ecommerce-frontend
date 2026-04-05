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
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
                Admin - Orders Management 📦
            </h2>

            <div className="overflow-x-auto bg-white shadow rounded-xl">
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
                                        className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        </div>
    );
}