import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";

export default function Products() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-lg font-semibold animate-pulse">
                    Loading products...
                </p>
            </div>
        );
    }

    return (
        <div className="p-3 sm:p-4 md:p-6">
            {/* Page Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                🛍️ Products
            </h1>

            {/* Responsive Grid */}
            <div className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5 
                gap-4
            ">
                {items.map((p) => (
                    <ProductCard key={p.productId} product={p} />
                ))}
            </div>
        </div>
    );
}