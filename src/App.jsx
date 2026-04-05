import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./store/slices/authSlice";
import RoleRoute from "./components/RoleRoute";
import OrderDetails from "./pages/OrderDetails";
import AdminOrders from "./pages/AdminOrders";
import Register from "./pages/Register";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile()); // 🔥 auto login
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
              path="/admin"
              element={<AdminOrders />}
          />
          <Route path="/products" element={<Products />} />          
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         {/*  <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </RoleRoute>
            }
          /> */}
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;