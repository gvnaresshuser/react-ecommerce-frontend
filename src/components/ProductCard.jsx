import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

export default function ProductCard({ product }) {
    console.log("Received product:", product);
    const dispatch = useDispatch();

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">

            {/* 🖼️ Image */}
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-contain"
            />

            {/* 📦 Content */}
            <div className="p-4 flex flex-col justify-between h-[200px]">

                {/* Title */}
                <h3 className="text-lg font-semibold line-clamp-1">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                    {product.description}
                </p>

                {/* Price */}
                <p className="text-xl font-bold text-green-600 mt-2">
                    ₹ {product.price}
                </p>

                {/* Button */}
                <button
                    className="mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => dispatch(addToCart(product))}
                >
                    Add to Cart 🛒
                </button>
            </div>
        </div>
    );
}