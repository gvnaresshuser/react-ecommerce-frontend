import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full">

            {/* 🖼️ Image */}
            <div className="w-full h-40 sm:h-48 md:h-52 flex items-center justify-center bg-gray-50">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full object-contain"
                />
            </div>

            {/* 📦 Content */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow">

                {/* Title */}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-1">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-1">
                    {product.description}
                </p>

                {/* Price */}
                <p className="text-lg sm:text-xl font-bold text-green-600 mt-2">
                    ₹ {product.price}
                </p>

                {/* Spacer pushes button to bottom */}
                <div className="flex-grow" />

                {/* Button */}
                <button
                    className="mt-3 bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition text-sm sm:text-base"
                    onClick={() => dispatch(addToCart(product))}
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}