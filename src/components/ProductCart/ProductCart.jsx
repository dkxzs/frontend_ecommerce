import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { useState } from "react";

import Button from "../Button/Button";
import img from "../../assets/images/iphone16.jpg";
import { Link } from "react-router-dom";

const ProductCart = (props) => {
  const { product } = props;
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="relative">
        <img
          src={img}
          alt="Women's Classic Pullover Hoodie"
          className="w-full md:w-auto object-contain object-center mt-2"
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
        <Link to="/product-detail">
          <h3 className="font-medium text-2xl cursor-pointer line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-green-600">
            {product.price} vnd
          </span>
          <span className="text-xl text-gray-500 ">-5%</span>
        </div>

        <p className="text-md text-ellipsis overflow-hidden line-clamp-2 text-gray-600">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-1">
          <FaStar className="w-5 h-5 text-yellow-300" />
          <span className="text-lg text-gray-600 ml-1">
            {product.rating} | Đã bán {product.selled || 0}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            text="Add to cart"
            className="text-lg flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            onclick={() => alert("successful")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
