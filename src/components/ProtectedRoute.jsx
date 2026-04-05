import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
    const { isAuth, loading } = useSelector((state) => state.auth);

    if (loading) return <p>Loading...</p>;

    if (!isAuth) return <Navigate to="/login" />;

    return children;
}