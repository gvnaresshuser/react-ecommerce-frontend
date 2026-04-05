import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../store/slices/orderSlice";
import { getStatusStyle } from "../utils/statusUtils";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";
export default function OrderDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedOrder, loading } = useSelector(
        (state) => state.orders
    );

    useEffect(() => {
        dispatch(fetchOrderById(id));
    }, [dispatch, id]);

    if (loading || !selectedOrder) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <button
                onClick={() => navigate("/orders")}
                className="mb-4 text-blue-500 hover:underline"
            >
                ← Back to Orders
            </button>

            <h2 className="text-2xl font-bold mb-4">
                Order #{selectedOrder.orderId}
            </h2>

            {/* Order Info */}
            <div className="border p-4 rounded mb-4">
                {/* <p>Status: <b>{selectedOrder.status}</b></p> */}
                <p>
                    Status:
                    <span
                        className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(selectedOrder.status)}`}
                    >
                        {selectedOrder.status}
                    </span>
                </p>
                {/* <StatusBadge status={selectedOrder.status} /> */}
                <p>Total: ₹ {selectedOrder.total}</p>
               
                <p>
                    Date: {new Date(selectedOrder.date).toLocaleString()}
                </p>
                <div className="flex flex-col gap-2 mt-2">

                    {/* Payment ID */}
                    <span className="self-start inline-flex items-center bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-full">
                        💳 {selectedOrder.paymentId || "N/A"}
                    </span>

                    {/* Order Ref */}
                    <span className="self-start inline-flex items-center bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                        🔖 {selectedOrder.ref || "N/A"}
                    </span>

                </div>
            </div>

            {/* Items */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Items</h3>

                {selectedOrder.items.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between border p-3 mb-2 rounded"
                    >
                        <div className="flex items-center gap-3">
                            {item.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    alt=""
                                    className="w-16 h-16 object-cover"
                                />
                            )}

                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>
                            </div>
                        </div>

                        <p>₹ {item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}