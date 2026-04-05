import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { logout } from "../store/slices/authSlice";
import { showToast } from "../utils/toast";
import { useLocation } from "react-router-dom";
import { Key, X,Settings,LogOut } from "lucide-react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export default function Navbar() {

    const [showToken, setShowToken] = useState(false);

    const location = useLocation();
    const { role } = useSelector((state) => state.auth);
    const items = useSelector((state) => state.cart.items);
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const { user, isAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Navbar items:", items);
    console.log("Cart count:", cartCount);
    console.log("User info:", user);
    console.log("isAuth info:", isAuth);

    const isActive = (path) =>
        location.pathname === path
            ? "text-black-400 font-bold"
            : "";

    console.log(isActive("/admin"));

    const handleLogout = async () => {
        await api.post("/auth/logout");
        dispatch(logout());
        showToast("info", "Logged out 👋");
        navigate("/login");
        //window.location.reload(); // simple reset
    };

    return (
        <div className="flex justify-between bg-black text-white p-4">
            <h1>E-Commerce / <span className="text-green-500">Nest JS [ Backend-Server ]</span></h1>
            {/* <div className="text-green-500">Nest JS [ Backend-Server ]</div> */}

            <div className="space-x-4">
                
                {/* <Link to="/login">Login</Link>
                <Link to="/register">Register</Link> */}
                {isAuth &&
                    <Link to="/" className={isActive("/")}>Products</Link>
                }

                {isAuth && <Link to="/cart" className={`relative ${isActive("/cart")}`}>
                    Cart
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>}
                {isAuth && <Link to="/orders" className={isActive("/orders")}>Orders</Link>}
               
                {isAuth && (
                    <>
                        <span>Hi, {user?.username}</span>

                        {/* 🔑 Key Icon */}
                        <button
                            onClick={() => setShowToken(true)}
                            className="inline-flex items-center justify-center p-2 bg-gray-700 rounded hover:bg-gray-600"
                        >
                            <Key size={18} />
                        </button>

                       
                    </>
                )}
                <Link
                    to="/admin"
                    className={`bg-green-400 text-black px-3 py-1 rounded font-semibold ${isActive("/admin")}`}
                >
                    Admin ⚙️
                </Link>
                
                <Link
                    to="/admin"
                    className={`bg-green-500 text-white px-3 py-1 rounded font-semibold 
  flex items-center gap-1 whitespace-nowrap hover:bg-green-600 transition ${isActive("/admin")}`}
                >
                    <Settings size={16} />
                    <span>Admin</span>
                </Link>

                {isAuth && (
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded font-semibold 
    flex items-center gap-1 whitespace-nowrap hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                )}
                {/* {role === "ADMIN" && <Link to="/admin">Admin</Link>} */}
            </div>
            {/* {showToken && ( */}
                <div
                    className={`fixed top-0 right-6 z-50 w-[320px]
                    bg-gradient-to-br from-indigo-500 to-purple-600 text-white
                    rounded-xl shadow-2xl
                    transform transition-all duration-500 ease-in-out
                    ${showToken
                                                ? "translate-y-20 opacity-100 scale-100"
                                                : "-translate-y-full opacity-0 scale-95 pointer-events-none"}
                    `}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-3 border-b border-white/30">
                        <h2 className="text-sm font-semibold">🔐 JWT Token</h2>
                        <button onClick={() => setShowToken(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-3 text-xs">

                        {(() => {
                            const token = localStorage.getItem("token");
                            //const token = Cookies.get("jwt"); // cookie name must match backend
                            console.log("token",token);

                            let decoded = null;
                            try {
                                decoded = token ? jwtDecode(token) : null;
                            } catch {
                                decoded = { error: "Invalid token" };
                            }

                            return (
                                <>
                                    <p className="font-semibold mb-1">Raw:</p>
                                    <pre className="bg-black/30 p-2 rounded text-xs whitespace-pre-wrap break-all overflow-hidden">
                                        {token || "No token"}
                                    </pre>

                                    <p className="font-semibold mt-3 mb-1">Decoded:</p>

                                    <div className="bg-black/30 p-2 rounded text-xs space-y-2">

                                        <div>
                                            <strong>User:</strong> {decoded?.username || "N/A"}
                                        </div>

                                        <div>
                                            <strong>Issued At (iat):</strong><br />
                                            Unix: {decoded?.iat || "N/A"}<br />
                                            Human: {decoded?.iat
                                                ? new Date(Number(decoded.iat) * 1000).toLocaleString("en-IN")
                                                : "N/A"}
                                        </div>

                                        <div>
                                            <strong>Expiry (exp):</strong><br />
                                            Unix: {decoded?.exp || "N/A"}<br />
                                            Human: {decoded?.exp
                                                ? new Date(Number(decoded.exp) * 1000).toLocaleString("en-IN")
                                                : "N/A"}
                                        </div>

                                    </div>

                                    {/* Full JSON (optional) */}
                                    <pre className="bg-black/30 p-2 rounded text-xs mt-3 whitespace-pre-wrap break-all">
                                        {JSON.stringify(decoded, null, 2)}
                                    </pre>
                                </>
                            );
                        })()}
                    </div>
                </div>
            {/* )} */}
        </div>
    );
}