import { useEffect, useMemo, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const selectedItems = useSelector((state) => state.order.selectedItemOrders);
  const [listCheck, setListCheck] = useState(selectedItems || []);
  const dispatch = useDispatch();

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setListCheck(order?.orderItems?.map((item) => item.productId));
    } else {
      setListCheck([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder(listCheck));
  }, [listCheck, dispatch]);

  const handleSelectItem = (e) => {
    if (listCheck.includes(e.target.value)) {
      setListCheck(listCheck.filter((item) => item !== e.target.value));
    } else {
      setListCheck([...listCheck, e.target.value]);
    }
  };

  const handleQuantityChange = (type, productId) => {
    const product = order?.orderItems?.find(
      (item) => item.productId === productId
    );
    if (!product) return;

    if (type === "increase") {
      dispatch(increaseAmount({ productId }));
    } else {
      if (product.amount > 1) {
        dispatch(decreaseAmount({ productId }));
      } else {
        dispatch(removeOrderProduct({ productId }));
      }
    }
  };

  const handleDeleteItem = (productId) => {
    dispatch(removeOrderProduct({ productId }));
  };

  const handleDeletAll = () => {
    if (listCheck.length > 0) {
      dispatch(removeAllOrderProduct({ listCheck }));
    }
  };

  const calculateSubtotal = useMemo(() => {
    return order?.orderItems
      ?.filter((item) => listCheck.includes(item.productId))
      .reduce((total, item) => {
        return total + item.price * item.amount * (1 - item.discount / 100);
      }, 0);
  }, [order?.orderItems, listCheck]);

  const calculatePriceDelivery = useMemo(() => {
    if (calculateSubtotal < 100000) {
      return 0;
    } else if (calculateSubtotal < 400000) {
      return 50000;
    } else {
      return 400000;
    }
  }, [calculateSubtotal]);

  const calculateTotal = useMemo(() => {
    return calculateSubtotal + calculatePriceDelivery;
  }, [calculateSubtotal, calculatePriceDelivery]);

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-medium mb-6">Giỏ hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-md shadow-sm">
              <div className="grid grid-cols-12 p-4 border-b text-sm text-gray-600">
                <div className="col-span-5">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className=" h-4 w-4 text-blue-600 focus:outline-none focus:ring-0 focus:ring-offset-0"
                      checked={listCheck.length === order?.orderItems?.length}
                      onChange={(e) => handleSelectAll(e)}
                    />
                    <span className="ml-2 text-xl">
                      Tất cả ({order?.orderItems?.length} sản phẩm)
                    </span>
                  </label>
                </div>
                <div className="col-span-2 text-center text-xl">Đơn giá</div>
                <div className="col-span-2 text-center text-xl">Số lượng</div>
                <div className="col-span-2 text-center text-xl">Thành tiền</div>
                <div
                  className="col-span-1 text-center text-xl cursor-pointer"
                  onClick={handleDeletAll}
                >
                  Xoá hết
                </div>
              </div>

              {order?.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 p-4 items-center border-b"
                >
                  <div className="col-span-5 flex items-center space-x-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                      value={item.productId}
                      checked={listCheck.includes(item.productId)}
                      onChange={(e) => handleSelectItem(e)}
                    />
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="text-sm">
                      <span className="text-red-500 text-xl">
                        {item.price.toLocaleString()} đ - {item.discount || 0} %
                      </span>{" "}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center justify-center">
                      <button
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-l-md"
                        onClick={() =>
                          handleQuantityChange("decrement", item.productId)
                        }
                      >
                        −
                      </button>
                      <input
                        type="text"
                        className="w-10 h-8 border-t border-b border-gray-300 text-center px-1"
                        value={item.amount > 1 ? item.amount : 1}
                        readOnly
                      />
                      <button
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-r-md"
                        onClick={() =>
                          handleQuantityChange("increase", item.productId)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-red-500 text-xl">
                    {(
                      +item.price *
                      +item.amount *
                      (1 - item.discount / 100)
                    ).toLocaleString()}{" "}
                    đ
                  </div>

                  <div className="col-span-1 text-center">
                    <button
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => handleDeleteItem(item.productId)}
                    >
                      <FiTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {order?.orderItems.length === 0 && (
              <div className="text-center text-2xl m-10">Giỏ hàng trống</div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-md shadow-sm p-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xl">Tạm tính</span>
                  <span className="font-medium text-xl">
                    {calculateSubtotal.toLocaleString() || 0} đ
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 text-xl">Thuế</span>
                  <span className="font-medium text-xl">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xl">Phí giao hàng</span>
                  <span className="font-medium text-xl">
                    {calculatePriceDelivery.toLocaleString() || 0} đ
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-3xl">Tổng tiền</span>
                    <span className="text-3xl font-bold text-red-500">
                      {calculateTotal.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="text-md text-gray-500 text-right mt-1 ">
                    (Đã bao gồm VAT nếu có)
                  </div>
                </div>
                <button
                  className={`w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-medium transition duration-200 text-2xl ${
                    listCheck.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={listCheck.length === 0}
                  onClick={() => {
                    handleCheckOut();
                  }}
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
