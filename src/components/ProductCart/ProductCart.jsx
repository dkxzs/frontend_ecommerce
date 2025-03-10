import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { useState } from "react";

import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from "../../redux/slices/orderSlice";

const ProductCart = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isLogin = useSelector((state) => state.user.isAuth);

  const navigate = useNavigate();
  const location = useLocation();

  const onClick = () => {
    navigate(`/product-detail`, { state: product });
  };

  const handleAddToCart = () => {
    if (isLogin) {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: product?.name,
            amount: 1,
            image: product?.image,
            price: product?.price,
            product: product?._id,
            discount: product?.discount,
          },
        })
      );
    } else {
      navigate("/sign-in", { state: location?.pathname });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="relative">
        <img
          src={product?.image}
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
        <div onClick={onClick}>
          <h3 className="font-medium text-2xl cursor-pointer line-clamp-2">
            {product?.name} {product?.countInStock === 0 ? "- Hết hàng" : ""}
          </h3>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-green-600">
            {product?.price.toLocaleString()} vnd
          </span>
          <span className="text-xl text-gray-500 ">
            {product?.discount || 0}%
          </span>
        </div>

        <p className="text-md text-ellipsis overflow-hidden line-clamp-2 text-gray-600">
          {product?.shortDescription}
        </p>

        <div className="flex items-center gap-1">
          <FaStar className="w-5 h-5 text-yellow-300" />
          <span className="text-lg text-gray-600 ml-1">
            {product?.rating} | Đã bán {product?.selled || 0}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            text="Thêm vào giỏ hàng"
            className="text-lg flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            onclick={handleAddToCart}
            disabled={product?.countInStock === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
