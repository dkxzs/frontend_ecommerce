import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const account = useSelector((state) => state.user.account);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: account?.name || "",
      phone: account?.phone || "",
      email: account?.email || "",
      address: account?.address || "",
      city: account?.city || "",
    }));
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-3xl font-medium mb-6 mt-5">Thanh toán</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Left Column - Shipping Address */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-medium mb-4">Thông tin nhận hàng</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <input
                type="text"
                name="name"
                placeholder="Họ Tên"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={formData.address}
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                placeholder="Thành phố"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        {/* Right Column - Products and Payment */}
        <div className="space-y-6">
          {/* Products Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Sản phẩm</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="iPhone"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">
                  Apple iPhone 15 Plus Mini 128GB - Pink
                </h3>
                <p className="text-green-600 text-sm">₹ 2599 X 1</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹ 2599</p>
              </div>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <h3 className="font-medium">Tổng tiền</h3>
              <p className="font-medium">₹ 2599</p>
            </div>
          </div>

          {/* Payment Mode Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Payment Mode</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="prepaid"
                  name="paymentMode"
                  value="prepaid"
                  checked={formData.paymentMode === "prepaid"}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor="prepaid">Prepaid</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMode"
                  value="cod"
                  checked={formData.paymentMode === "cod"}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor="cod">Cash On Delivery</label>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor="terms" className="text-sm">
                  I agree with the{" "}
                  <a href="#" className="text-blue-600">
                    terms & conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition"
              onClick={handleSubmit}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
