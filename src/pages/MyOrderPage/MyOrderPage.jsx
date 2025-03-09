import { useSelector } from "react-redux";
import { cancelOrder, getAllOrderByUserId } from "../../services/orderServices";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutationHook";
import { toast } from "react-toastify";

const MyOrderPage = () => {
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const getMyOrder = ({ id }) => {
    let data = getAllOrderByUserId(id);
    return data;
  };
  const { data: res, refetch } = useQuery({
    queryKey: ["myOrder"],
    queryFn: () => getMyOrder({ id: account.id }),
    enabled: !!account.id,
  });

  const onClickDetail = (id, status) => {
    navigate(`/order-detail`, { state: { id: id, status: status } });
  };

  const mutation = useMutationHook(
    ({ id, orderItems }) => cancelOrder(id, orderItems),
    {
      onSuccess: (data) => {
        if (data.EC === 0) {
          toast.success(data.EM);
          refetch();
        } else {
          toast.error(data.EM);
        }
      },
    }
  );

  const handleCancel = (order) => {
    mutation.mutate({ id: order._id, orderItems: order?.orderItems });
  };
  return (
    <div className="lg:h-screen container mx-auto">
      <div className=" bg-gray-50 lg:h-screen p-4">
        <div className="w-3/5 mx-auto">
          <h1 className="text-2xl font-medium text-gray-700 mb-6">
            Đơn hàng của tôi
          </h1>

          {res &&
            res?.DT?.map((item, index) => {
              return (
                <div key={index} className="bg-white shadow-sm rounded-lg p-6">
                  <div className="space-y-6">
                    {/* Order Status */}
                    <div>
                      <h2 className="font-medium text-xl text-gray-800 mb-2">
                        Trạng thái
                      </h2>
                      <div className="space-y-1">
                        <p>
                          <span className="text-gray-600 text-lg">
                            Giao hàng:{" "}
                          </span>
                          <span className="text-pink-500 text-lg">
                            {item?.isDelivered
                              ? "Đã giao hàng"
                              : "Chưa giao hàng"}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-600 text-lg">
                            Thanh toán:{" "}
                          </span>
                          <span className="text-pink-500 text-lg">
                            {item?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="border-b border-t">
                      {item?.orderItems &&
                        item?.orderItems?.map((product, index) => {
                          return (
                            <div key={index} className=" py-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 relative flex-shrink-0">
                                    <img
                                      src={product?.image}
                                      className="w-full h-full object-cover border-gray-200"
                                    />
                                  </div>
                                  <span className="text-gray-700">
                                    {product?.name}
                                  </span>
                                </div>
                                <span className="text-gray-700">
                                  {(
                                    product?.price -
                                    product?.price * (product?.discount / 100)
                                  ).toLocaleString()}{" "}
                                  đ
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    <div className="flex justify-end">
                      <p className="text-right">
                        <span className="text-pink-500 font-medium">
                          Tổng tiền:{" "}
                        </span>
                        <span className="font-medium">
                          {item?.totalPrice.toLocaleString()} đ
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-end items-center space-x-3 pt-2">
                      {item?.status === "pending" && (
                        <button
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                          onClick={() => handleCancel(item)}
                        >
                          Hủy đơn hàng
                        </button>
                      )}
                      {item?.status === "canceled" && (
                        <span>Đã huỷ đơn hàng</span>
                      )}
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                        onClick={() => onClickDetail(item?._id, item?.status)}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MyOrderPage;
