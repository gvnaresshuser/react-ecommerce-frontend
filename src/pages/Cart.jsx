import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    removeFromCart,
    increaseQty,
    decreaseQty,
} from "../store/slices/cartSlice";
import { placeOrder } from "../store/slices/orderSlice";
import { showToast } from "../utils/toast";
import { clearCart } from "../store/slices/cartSlice";
import api from "../api/axios";
import {  useNavigate } from "react-router-dom";

export default function Cart() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const navigate = useNavigate();
    const totalAmount = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );


    //--------------------------------------
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true); // 🔥 start loading
        const isLoaded = await loadRazorpay(); // 🔥 ADD THIS

        if (!isLoaded) {
            showToast("error", "Razorpay SDK failed to load");
            return;
        }
        try {
        const order = await api.post("/orders/razorpay/create-order", {
            items: items.map(i => ({
                productId: i.productId,
                quantity: i.quantity,
            })),
            paymentMethod: "RAZORPAY",
        });
        //key: "YOUR_KEY_ID",
        const options = {            
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.data.amount,
            currency: "INR",
            order_id: order.data.razorpayOrderId,

            handler: async function (response) {
                // 🔥 VERIFY PAYMENT
                await api.post("/orders/razorpay/verify", response);

                //alert("Payment successful 🎉");
                
                showToast("success", "Order placed successfully 🛒");

                // clear cart
                //items.forEach(item => dispatch(removeFromCart(item.id)));
                dispatch(clearCart());
                setLoading(false); // ✅ stop loading
                navigate("/orders");
            },
        };

        const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function () {
                showToast("error", "Payment failed ❌");
                setLoading(false); // ✅ stop loading
            });

        rzp.open();
        } catch (err) {
            showToast("error", "Something went wrong ❌");
            setLoading(false);
        }
    };
    //--------------------------------------
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center">

                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    🛒 Your cart is empty
                </h2>

                <p className="text-gray-500 mb-4">
                    Looks like you haven't added anything yet
                </p>

                <button
                    onClick={() => navigate("/products")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Go to Products
                </button>

            </div>
        );
    }

    return (
        <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 🛒 CART ITEMS */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">
                        🛒 Shopping Cart
                    </h2>

                    {items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center border p-3 sm:p-4 mb-3 rounded shadow-sm gap-3"
                        >
                            {/* LEFT */}
                            <div>
                                <h3 className="font-semibold text-sm sm:text-base">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    ₹ {item.price}
                                </p>
                            </div>

                            {/* CENTER: Quantity */}
                            <div className="flex items-center gap-2">
                                <button
                                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                    onClick={() => dispatch(decreaseQty(item.productId))}
                                >
                                    -
                                </button>

                                <span className="min-w-[20px] text-center">
                                    {item.quantity}
                                </span>

                                <button
                                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                    onClick={() => dispatch(increaseQty(item.productId))}
                                >
                                    +
                                </button>
                            </div>

                            {/* RIGHT: Remove */}
                            <button
                                className="text-red-500 text-sm hover:underline"
                                onClick={() => dispatch(removeFromCart(item.productId))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* 💰 ORDER SUMMARY */}
                <div className="border p-4 rounded shadow h-fit lg:sticky lg:top-4 bg-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-4">
                        💰 Order Summary
                    </h3>

                    <p className="mb-2 text-sm sm:text-base">
                        Subtotal ({items.length} items):
                        <span className="font-semibold ml-1">
                            ₹ {totalAmount.toFixed(2)}
                        </span>
                    </p>

                    <button
                        className="bg-yellow-400 w-full py-2 rounded font-semibold mt-3 hover:bg-yellow-500 transition disabled:opacity-50"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                </div>
            </div>
        </div>
    );
}
/*
Now flow becomes:

Click button
   ↓
handlePayment()
   ↓
Razorpay opens 💳
   ↓
Payment success
   ↓
Verify API
   ↓
Cart cleared
*/