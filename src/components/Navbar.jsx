import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import { logout } from "../store/slices/authSlice";
import { showToast } from "../utils/toast";
import { User ,Key, X, Settings, LogOut, ShoppingCart, Menu, FileText, Package } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
    const [showToken, setShowToken] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const location = useLocation();
    const { role, user, isAuth } = useSelector((state) => state.auth);
    const items = useSelector((state) => state.cart.items);
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path) =>
        location.pathname === path ? "text-yellow-400 font-bold" : "";

    const handleLogout = async () => {
        await api.post("/auth/logout");
        dispatch(logout());
        showToast("info", "Logged out 👋");
        navigate("/login");
    };

    const MenuLinks = () => (
        <>
            {isAuth && <Link
                to="/products"
                className="bg-purple-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-purple-600 transition"
            >
                <Package size={16} /> Products
            </Link>}

            {isAuth && (
                <Link
                    to="/cart"
                    className={`relative bg-yellow-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-yellow-600 transition ${isActive("/cart")}`}
                >
                    <ShoppingCart size={16} /> Cart

                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>
            )}

            {isAuth && <Link
                to="/orders"
                className="bg-blue-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition"
            >
                <FileText size={16} /> Orders
            </Link>}

            <Link
                to="/admin"
                className="bg-green-500 px-3 py-1 rounded flex items-center gap-1"
            >
                <Settings size={16} /> Admin
            </Link>

            {isAuth && (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded flex items-center gap-1"
                >
                    <LogOut size={16} /> Logout
                </button>
            )}
        </>
    );

    return (
        <>
            {/* TOP NAVBAR */}
            <div className="flex justify-between items-center bg-black text-white p-4">
                {/* Logo */}
                {/* <h1 className="flex items-center gap-2 text-lg font-semibold">
                    <ShoppingCart size={20} className="text-yellow-400" />
                    E-Commerce
                </h1> */}
                <div className="flex justify-between items-center bg-black text-white p-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                        <ShoppingCart size={20} className="text-yellow-400" />
                        E-Commerce
                    </Link>
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-6">
                    <MenuLinks />

                    {isAuth && (
                        <>
                            <span>Hi, {user?.username}</span>

                            <button
                                onClick={() => setShowToken(true)}
                                className="p-2 bg-orange-400 rounded"
                            >
                                <Key size={18} />
                            </button>
                        </>
                    )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenu(true)}
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* MOBILE SIDE MENU */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300
                ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="font-semibold">Menu</h2>
                    <button onClick={() => setMobileMenu(false)}>
                        <X />
                    </button>
                </div>
                {/* 🔥 Logo Section */}
                <div className="w-full h-32 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                    <img
                        src="/cart.png" // 👈 your logo path
                        alt="Logo"
                        className="h-40 w-40 object-contain"
                    />
                </div>
                {/* Header */}
             

                <div className="flex flex-col gap-4 p-4">
                    <MenuLinks />

                    {isAuth && (
                        <>
                       {/*  <button
                            onClick={() => setShowToken(true)}
                            className="p-2 bg-orange-400 rounded w-fit"
                        >
                            <Key size={18} />
                        </button> */}
                        <button
                                onClick={() => setShowToken(true)}
                                className="bg-orange-500 px-3 py-1 rounded flex items-center gap-1"
                >
                <Key size={16} /> Token
                </button>
                </>
                    )}
                    {isAuth && (
                        <div className="flex items-center gap-2">
                            <User size={18} className="text-yellow-400" />
                            <span>Hi, {user?.username}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* OVERLAY */}
            {mobileMenu && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileMenu(false)}
                />
            )}

            {/* TOKEN POPUP (UNCHANGED) */}
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
                        console.log("token", token);

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
        </>
    );
}