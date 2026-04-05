import { useState } from "react";
import { Key, X } from "lucide-react";
import jwtDecode from "jwt-decode";

export default function TokenViewer({ token }) {
    const [open, setOpen] = useState(false);

    let decoded = null;

    try {
        decoded = token ? jwtDecode(token) : null;
        console.log("Decoded:", decoded);
    } catch (err) {
        decoded = { error: "Invalid token" };
    }

    const formatTime = (unix) => {
        if (!unix) return "N/A";

        const num = Number(unix);
        if (isNaN(num)) return "Invalid";

        return new Date(num * 1000).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "medium",
        });
    };

    return (
        <>
            {/* 🔑 Key Icon Button */}
            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
                <Key size={18} />
            </button>

            {/* 🧊 Overlay */}
            {open && (
                <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpen(false)} />
            )}

            {/* 📦 Sliding Card */}
            <div
                className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg z-50 transform transition-transform duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">JWT Token</h2>
                    <button onClick={() => setOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                    <h3 className="font-semibold mb-2">🔹 Raw Token</h3>
                    <pre className="bg-gray-100 p-2 rounded text-xs whitespace-pre-wrap break-all overflow-hidden">
                        {token || "No token available"}
                    </pre>

                    <h3 className="font-semibold mt-4 mb-2">🔹 Decoded Token</h3>

                    <div className="bg-gray-100 p-2 rounded text-xs space-y-2">

                        <div>
                            <strong>User:</strong> {decoded?.username || "N/A"}
                        </div>

                        <div>
                            <strong>Issued At (iat):</strong><br />
                            Unix: {decoded?.iat || "N/A"}<br />
                            Human: {formatTime(Number(decoded?.iat))}
                        </div>

                        <div>
                            <strong>Expiry (exp):</strong><br />
                            Unix: {decoded?.exp || "N/A"}<br />
                            Human: {formatTime(Number(decoded?.exp))}
                        </div>
                    </div>

                    {/* Optional full JSON */}
                    <pre className="bg-gray-100 p-2 rounded text-xs mt-3 whitespace-pre-wrap break-words">
                        {JSON.stringify(decoded, null, 2)}
                    </pre>
                </div>
            </div>
        </>
    );
}