import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { getStatusStyle } from "../utils/statusUtils";
import StatusBadge from "../components/StatusBadge";
export default function Orders() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>

            {orders.length === 0 && <p>No orders found</p>}

            {orders.map((order) => (

                <div
                    key={order.orderId}
                    className="border p-4 mb-3 rounded shadow cursor-pointer"
                    onClick={() => navigate(`/orders/${order.orderId}`)}
                >
                    <div className="flex justify-between">
                        <p><b>Order ID:</b> {order.orderId}</p>
                        <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Order Ref: {order.ref}
                        </span>
                      
                        <StatusBadge status={order.status} />
                    </div>

                    <p>Total: ₹ {order.total}</p>
                    <p>Date: {new Date(order.date).toLocaleString()}</p>
                    {/* <p className="text-xs text-gray-400">
                        [ Tap to view full details ]
                    </p> */}
                    <span className="text-sm text-blue-500 font-medium">
                        View Details →
                    </span>
                </div>
            ))}
        </div>
    );
}