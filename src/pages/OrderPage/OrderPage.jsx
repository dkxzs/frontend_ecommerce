import { useLocation } from "react-router-dom";
import { orderContant } from "../../utils/constant";

const OrderPage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div className=" container mx-auto bg-slate-50 md:h-screen">
      <div className="text-center py-4">
        <h1 className="text-3xl font-medium">Đơn hàng</h1>
      </div>

      <div className="w-3/5 mx-auto p-4 bg-white my-4 rounded-lg shadow-sm">
        <div className="mb-6">
          <h2 className="font-medium mb-2 text-xl">Phương thức giao hàng</h2>
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-md">
            <span className="text-orange-500 font-bold mr-2 text-lg">
              {orderContant.delivery[state?.shippingMethod]}
            </span>
            <span className="text-lg">Giao hàng tiết kiệm</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-medium mb-2 text-xl">Phương thức thanh toán</h2>
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-md">
            <span className="text-lg">
              {orderContant.payment[state?.paymentMethod]}
            </span>
          </div>
        </div>

        {state?.orders &&
          state?.orders.map((item, index) => {
            return (
              <div key={index}>
                <div className="mt-10 grid grid-cols-3 items-center text-center">
                  <div className="flex items-center gap-2">
                    <img className="w-12 h-12 object-cover" src={item.image} />
                    <div>
                      <span className="text-gray-700 text-ellipsis whitespace-nowrap overflow-hidden block max-w-[200px]">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    {(
                      item.price -
                      (item.price * (item.discount || 0)) / 100
                    ).toLocaleString()}{" "}
                    đ
                  </div>
                  <div className="text-red-500">Số lượng: {item.amount}</div>
                </div>
              </div>
            );
          })}
        <div className="flex justify-end gap-3 items-center mt-10">
          <h2 className="font-medium text-xl ">Tổng tiền</h2>
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-md">
            <span className="text-lg">
              {state?.totalPrice.toLocaleString()} đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
