import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { useState } from "react";

import Button from "../Button/Button";
import img from "../../assets/images/iphone16.jpg";

const ProductCart = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={img}
          alt="Women's Classic Pullover Hoodie"
          className="object-cover object-center"
        />
        <button
          className="absolute right-2 top-2 p-1.5 rounded-full hover:bg-white/90"
          aria-label="Add to wishlist"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          {isWishlisted ? (
            <FaHeart className="size-7 text-red-500" />
          ) : (
            <FaRegHeart className="size-7 text-red-500" />
          )}
        </button>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-medium text-2xl cursor-pointer line-clamp-2">
          Women's Classic Pullover Hoodie - Cozy & Chic
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-green-600">
            900 $
          </span>
          <span className="text-xl text-gray-500 line-through">1100$</span>
        </div>

        <p className="text-md text-ellipsis overflow-hidden line-clamp-2 text-gray-600">
          Elevate your casual style with our Women's Classic Pullover...
        </p>

        <div className="flex items-center gap-1">
          <FaStar className="w-5 h-5 text-yellow-200" />
          <span className="text-lg text-gray-500 ml-1">4.3 (11)</span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            text="Add to cart"
            className="text-lg flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            path="/cart"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
