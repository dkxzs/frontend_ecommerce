import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import img from "../../assets/images/iphone16.jpg";
import { useNavigate } from "react-router-dom";
const ProductDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Reset cuộn khi component được render
  }, []);
  let navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("Đen");
  const colors = ["Đen", "Trắng", "Màu xanh da trời", "Kaki", "Hồng"];
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
        {/* Hình ảnh sản phẩm */}
        <div className="w-1/2 flex items-center flex-col">
          <img src={img} alt="Tai nghe" className="w-4/5 rounded-lg" />
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

        {/* Thông tin sản phẩm */}
        <div className="w-1/2 space-y-4">
          <h1 className="text-5xl font-semibold">
            Tai nghe X55 mini không dây, chống ồn, Bluetooth 5.3
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="text-gray-600">4.7 | 4.9k Đánh Giá</span>
          </div>
          <div className="text-red-600 text-2xl font-bold">
            ₫75.000 - ₫125.000
          </div>
          <div className="text-gray-400 line-through">₫148.800</div>

          {/* Màu sắc */}
          <div>
            <h2 className="font-semibold">Màu sắc</h2>
            <div className="flex gap-2 mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`px-3 py-1 border rounded ${
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
          </div>

          {/* Nút mua hàng */}
          <div className="flex gap-4 mt-4">
            <button className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600">
              Thêm Vào Giỏ Hàng
            </button>
            <button className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
