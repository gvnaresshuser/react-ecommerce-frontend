import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { showToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../store/slices/authSlice";
export default function Login() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogin = async () => {
        console.log("handleLogin");
        if (!form.username || !form.password) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true); // ✅ only after validation
            setError("");

            const res = await api.post("/auth/login", form);
            console.log("RESPONSE",res);

            // 🔥 THIS LINE FIXES EVERYTHING
            // 🔥 fetch logged-in user from backend
            await dispatch(fetchProfile()).unwrap();

            // ✅ store for debug UI
            localStorage.setItem("token", res.data.token);

            showToast("success", "Login successful 🎉");
            navigate("/products");

        } catch (err) {
            setLoading(false);
            setError("Invalid username or password");
            showToast("error", "Invalid credentials ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-gradient-to-l from-green-200 to-blue-200 border border-amber-300">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            {error && (
                <p className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</p>
            )}

            <input
                className="border w-full p-2 mb-3 rounded"
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <input
                type="password"
                className="border w-full p-2 mb-3 rounded"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

       
            <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full p-2 rounded text-white flex items-center justify-center gap-2 ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-600"
                    }`}
            >
                {loading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 underline">
                    Register
                </Link>
            </p>
            {/* Demo Credentials Card */}
            <div className="max-w-sm mx-auto mt-6 bg-white shadow-lg rounded-xl p-4 border border-red-200">
                <h3 className="text-center text-lg font-semibold text-gray-700 mb-2">
                    Demo Login
                </h3>

                <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-800 border border-red-200">
                    <p>
                        <span className="font-semibold">Username:</span> gvnaressh
                    </p>
                    <p className="mt-1">
                        <span className="font-semibold">Password:</span> 123456
                    </p>
                </div>
            </div>
        </div>
    );
}
/*
🧠 WHY .unwrap()?
Converts thunk result → real Promise ✅
Throws error if rejected ✅
Removes TS warning ✅
---------------------------------
TypeScript says:

'await' has no effect on the type of this expression

👉 Because dispatch() is typed as returning a plain action, not a Promise.

But in reality:

👉 createAsyncThunk DOES return a promise-like action internally ✅

So:

Runtime → works ✅
TypeScript → confused ❌
*/