import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { showToast } from "../utils/toast";
export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        fullname: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!form.username || !form.email || !form.password || !form.fullname) {
            //return setError("All fields are required");
            setError("All fields are required");
            return showToast("warning", "All fields are required");
        }

        if (form.password.length < 4) {
            return setError("Password must be at least 4 characters");
        }

        try {
            setError("");
            await api.post("/auth/register", form);
            showToast("success", "Registered successfully 🎉");
            navigate("/login");
        } catch (err) {
            setError("Registration failed (username/email may exist)");
            showToast("error", "Registration failed ❌");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-gradient-to-l from-red-200 to-green-300 border border-amber-300">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

            {error && (
                <p className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</p>
            )}

            <input
                className="border w-full p-2 mb-2 rounded"
                placeholder="Full Name"
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />

            <input
                className="border w-full p-2 mb-2 rounded"
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <input
                className="border w-full p-2 mb-2 rounded"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                className="border w-full p-2 mb-3 rounded"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
                onClick={handleRegister}
                className="bg-green-900 hover:bg-green-600 text-white w-full p-2 rounded"
            >
                Register
            </button>

            <p className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 underline">
                    Login
                </Link>
            </p>
        </div>
    );
}