import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import img from "../../assets/images/iphone16.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProductDetailPage = () => {
  const location = useLocation();
  const product = location.state;
  const account = useSelector((state) => state.user.account);
  const [quantity, setQuantity] = useState(1);
  console.log("product", product);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("Đen");
  const colors = ["Đen", "Trắng", "Màu xanh da trời", "Kaki", "Hồng"];

  const renderStart = (number) => {
    let stars = [];
    let remain = 5 - number;
    for (let i = 0; i < number; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    for (let i = 0; i < remain; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  };
  return (
    <div className="mb-16">
      <div className="container mx-auto mt-3">
        <button
          className=" py-1 px-3 flex items-center justify-center"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowRoundBack className="size-10" />
          <span className="text-xl font-semibold">Back</span>
        </button>
      </div>
      <div className="flex container mx-auto p-6 gap-8">
        <div className="w-5/12 flex items-center flex-col">
          <img
            src={product?.image}
            alt="Tai nghe"
            className="w-4/5 rounded-lg"
          />
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <img
                key={i}
                src={img}
                className="size-28 rounded-lg cursor-pointer px-1 py-2 border"
              />
            ))}
          </div>
        </div>

        <div className="w-7/12 space-y-6 border-l border-gray-300 pl-4">
          <h1 className="text-5xl font-semibold">{product?.name}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500 text-xl">{renderStart(product?.rating)}</span>
            <span className="text-gray-600 text-xl">
              {product?.rating} | Đã bán 1000+
            </span>
          </div>
          <div>
            <p className="text-gray-600 text-xl">{product?.shortDescription}</p>
          </div>
          <div className="text-red-600 text-5xl font-bold">
            {product?.price.toLocaleString()} ₫
          </div>

          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl ">Danh mục:</h2>
            <span className="font-normal text-xl">{product?.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl">Giao đến: </h2>
            <span className="font-normal text-2xl">{account.address}</span>
            <Link to="/profile" className="text-blue-500 font-semibold text-xl">
              Đổi địa chỉ
            </Link>
          </div>
          {/* <div>
            <h2 className="font-semibold text-xl">Màu sắc</h2>
            <div className="flex gap-2 mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`text-xl px-3 py-1 border rounded ${
                    selectedColor === color
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div> */}

          <div className="flex items-center gap-5">
            <h2 className="font-semibold text-xl">Số lượng:</h2>
            <div>
              <button
                className="text-lg px-3 py-2 border rounded border-gray-300"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  } else {
                    setQuantity(1);
                  }
                }}
              >
                <FaMinus />
              </button>
              <span className="text-xl px-3 py-1">{quantity}</span>
              <button
                className="text-lg px-3 py-2 border rounded border-gray-300"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="bg-orange-500 text-3xl text-white py-3 px-8 rounded hover:bg-orange-600">
              Thêm Vào Giỏ Hàng
            </button>
            <button className="bg-red-500 text-3xl text-white py-3 px-8 rounded hover:bg-red-600">
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
