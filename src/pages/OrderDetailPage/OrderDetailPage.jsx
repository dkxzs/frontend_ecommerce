import { useQuery } from "@tanstack/react-query";
import { FaCreditCard, FaTruck } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderDetailByOrderId } from "../../services/orderServices";
import { orderContant } from "../../utils/constant";

const OrderDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const getMyOrderDetail = ({ id }) => {
    let data = getOrderDetailByOrderId(id);
    return data;
  };

  const { data: res, refetch } = useQuery({
    queryKey: ["myOrderDetail"],
    queryFn: () => getMyOrderDetail({ id: state?.id }),
    enabled: !!state?.id,
  });

  const shippingAddress = res?.DT?.shippingAddress;
  const orderItems = res?.DT?.orderItems;

  return (
    <div className=" bg-gray-50 lg:min-h-screen">
      <div className="container mx-auto p-4 sm:p-6">
        <h1 className=" font-semibold text-gray-800 mb-6 text-2xl">
          Chi tiết đơn hàng
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Địa chỉ người nhận */}
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-4">
              ĐỊA CHỈ NGƯỜI NHẬN
            </h2>
            <div className="space-y-2">
              <p className="font-medium">{shippingAddress?.fullName}</p>
              <p className="text-sm text-gray-600">
                {shippingAddress?.address}
              </p>
              <p className="text-sm text-gray-600">
                Điện thoại: {shippingAddress?.phone}
              </p>
            </div>
          </div>

          {/* Hình thức giao hàng */}
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-4">
              HÌNH THỨC GIAO HÀNG
            </h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaTruck className="h-5 w-5 text-orange-500 mr-2" />
                <p className="font-medium">
                  <span className="text-orange-500 font-bold">FAST</span> Giao
                  hàng tiết kiệm
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Phí giao hàng: {res?.DT.shippingPrice.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>

          {/* Hình thức thanh toán */}
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-4">
              HÌNH THỨC THANH TOÁN
            </h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaCreditCard className="h-5 w-5 text-gray-500 mr-2" />
                <p className="font-medium">
                  {orderContant.payment[res?.DT.paymentMethod]}
                </p>
              </div>
              <p className="text-orange-500">
                {res?.DT?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="py-3 px-4 text-left">Sản phẩm</th>
                <th className="py-3 px-4 text-right">Giá</th>
                <th className="py-3 px-4 text-center">Số lượng</th>
                <th className="py-3 px-4 text-right">Giảm giá</th>
                <th className="py-3 px-4 text-right">Tạm tính</th>
                <th className="py-3 px-4 text-right">Tổng cộng</th>
              </tr>
            </thead>
            {orderItems &&
              orderItems.map((item, index) => {
                return (
                  <tbody key={index} className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 text-white flex items-center justify-center rounded">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-700">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {item.price.toLocaleString()} đ
                      </td>
                      <td className="py-4 px-4 text-center">{item.amount}</td>
                      <td className="py-4 px-4 text-right">
                        {(item.price * (item.discount / 100)).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        đ
                      </td>
                      <td className="py-4 px-4 text-right">
                        {(
                          item.price *
                          (1 - item.discount / 100)
                        ).toLocaleString("vi-VN")}{" "}
                        đ
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-red-500">
                        {(
                          item.price *
                          (1 - item.discount / 100) *
                          item.amount
                        ).toLocaleString("vi-VN")}{" "}
                        đ
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>

        {/* Nút hành động */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
          {state?.status === "pending" ? (
            <button className="px-6 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700">
              Thanh toán
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
