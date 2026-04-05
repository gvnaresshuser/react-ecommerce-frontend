import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";

export default function Products() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.products);
    console.log(items);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
         <div className="grid grid-cols-3 gap-4">
             {items.map((p) => (
                 <ProductCard key={p.productId} product={p} />
             ))}
         </div>
      
    );
}