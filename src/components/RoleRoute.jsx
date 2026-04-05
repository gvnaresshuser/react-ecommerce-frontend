import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleRoute({ children, allowedRoles }) {
    const { isAuth, role, loading } = useSelector((state) => state.auth);

    if (loading) return <p>Loading...</p>;

    if (!isAuth) return <Navigate to="/login" />;

    if (!allowedRoles.includes(role)) {
        return <p>Access Denied ❌</p>;
    }

    return children;
}