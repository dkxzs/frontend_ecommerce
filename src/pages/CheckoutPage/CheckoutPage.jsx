import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutationHook";
import { createOrder } from "../../services/orderServices";
import { toast } from "react-toastify";
import { updateUser } from "../../services/userServices";
import { login } from "../../redux/slices/userSlice";
import {
  removeAllOrderProduct,
  removeAllSelectedOrder,
} from "../../redux/slices/orderSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getClientIdKey } from "../../services/paymentServices";

const CheckoutPage = () => {
  const [clientID, setClientID] = useState(null);
  const location = useLocation();
  const dataOrder = location.state;
  let totalPrice = dataOrder?.finalPrice;
  const account = useSelector((state) => state.user.account);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formCheckOut, setFormCheckOut] = useState({
    shippingMethod: "standard",
    paymentMethod: "cash",
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  let products = order?.orderItems?.filter((item) =>
    order?.selectedItemOrders?.includes(item.product)
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: account?.name || "",
      phone: account?.phone || "",
      address: account?.address || "",
    }));
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeMethod = (e) => {
    const { name, value } = e.target;
    setFormCheckOut({
      ...formCheckOut,
      [name]: value,
    });
  };

  const mutationUpdateUser = useMutationHook(
    ({ id, userData }) => updateUser(id, userData),
    {
      onSuccess: (data) => {
        if (+data.EC === 0) {
          toast.success(data.EM);
          dispatch(login(data));
        } else {
          toast.error(data.EM);
        }
      },
    }
  );

  const mutationAddOrder = useMutationHook((data) => createOrder({ ...data }), {
    onSuccess: (data) => {
      if (+data.EC === 0) {
        toast.success(data.EM);
        dispatch(
          removeAllOrderProduct({ listCheck: order?.selectedItemOrders })
        );
        dispatch(removeAllSelectedOrder());
        navigate("/order", {
          state: {
            shippingMethod: formCheckOut.shippingMethod,
            paymentMethod: formCheckOut.paymentMethod,
            orders: products,
            totalPrice: totalPrice,
          },
        });
      } else {
        toast.error(data.EM);
      }
    },
  });

  const handleUpdateUser = (e) => {
    e.preventDefault();
    mutationUpdateUser.mutate({ id: account?.id, userData: formData });
  };

  products = products.map((item) => ({
    ...item,
    discount: item.discount ? item.discount : 0,
  }));

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Vui lòng nhập thông tin!");
    } else {
      mutationAddOrder.mutate({
        orderItems: products,
        fullName: formData.name,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formCheckOut.paymentMethod,
        itemsPrice: dataOrder.subPrice,
        shippingPrice: dataOrder.shippingPrice,
        totalPrice: dataOrder.finalPrice,
        user: account?.id,
        email: account?.email,
      });
    }
  };

  useEffect(() => {
    const fetchClientId = async () => {
      const res = await getClientIdKey();
      setClientID(res.data);
    };
    fetchClientId();
  }, []);

  const handleApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        mutationAddOrder.mutate({
          orderItems: products,
          fullName: formData.name,
          phone: formData.phone,
          address: formData.address,
          paymentMethod: formCheckOut.paymentMethod,
          itemsPrice: dataOrder.subPrice,
          shippingPrice: dataOrder.shippingPrice,
          totalPrice: dataOrder.finalPrice,
          user: account?.id,
          isPaid: true,
          paidAt: details.update_time,
          email: account?.email,
        });
      })
      .catch((err) => {
        console.error("Lỗi khi capture giao dịch:", err);
      });
  };

  const handleError = (err) => {
    // Xử lý lỗi tại đây
    console.error("PayPal Checkout onError", err);
    // Hiển thị thông báo lỗi hoặc chuyển hướng nếu cần
  };

  return (
    <div className="container mx-auto mb-5 md:h-screen">
      <h1 className="text-3xl font-medium mb-6 mt-5">Thanh toán</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Shipping Address */}
        <div className="h-auto bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-medium mb-4">Thông tin nhận hàng</h2>
          <form>
            <div className="space-y-8">
              <div>
                <label htmlFor="name">Tên</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Họ Tên"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded mt-4"
              onClick={(e) => {
                handleUpdateUser(e);
              }}
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>

        {/* Right Column - Products and Payment */}
        <div className="space-y-6">
          {/* Products Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-medium mb-4">Sản phẩm</h2>
            {products &&
              products.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-2xl">{item.name}</h3>
                        <p className="text-green-600 text-lg">
                          {item.price.toLocaleString()} đ x {item.amount} - (
                          {item.discount || 0} %)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-2xl">
                          {(
                            item.price *
                            item.amount *
                            (1 - item.discount / 100)
                          ).toLocaleString()}{" "}
                          đ
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <h3 className="font-medium text-2xl">Tổng tiền</h3>
              <p className="font-medium text-2xl">
                {(products.length > 0 &&
                  dataOrder?.finalPrice.toLocaleString()) ||
                  0}{" "}
                đ
              </p>
            </div>
          </div>

          {/* Payment Mode Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-medium mb-4">Phương thức giao hàng</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="fast"
                  id="fast"
                  checked={formCheckOut.shippingMethod === "fast"}
                  onChange={handleChangeMethod}
                  className="h-6 w-6"
                />
                <label htmlFor="fast" className="text-xl">
                  Giao hàng nhanh (FAST)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="standard"
                  name="shippingMethod"
                  value="standard"
                  checked={formCheckOut.shippingMethod === "standard"}
                  onChange={handleChangeMethod}
                  className="h-6 w-6"
                />
                <label htmlFor="standard" className="text-xl">
                  Giao hàng tiêu chuẩn (STANDARD)
                </label>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Phương thức thanh toán</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={formCheckOut.paymentMethod === "cash"}
                  onChange={handleChangeMethod}
                  className="h-6 w-6 focus:ring-offset-0"
                />
                <label htmlFor="cash" className="text-xl">
                  Thanh toán khi nhận hàng
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={formCheckOut.paymentMethod === "PayPal"}
                  onChange={handleChangeMethod}
                  className="h-6 w-6 focus:ring-offset-0"
                />
                <label htmlFor="PayPal" className="text-xl">
                  Thanh toán bằng paypal
                </label>
              </div>
            </div>

            {formCheckOut.paymentMethod === "PayPal" ? (
              <div className="mt-6">
                <PayPalScriptProvider
                  options={{
                    "client-id": clientID,
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: (parseInt(totalPrice) / 25000).toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={handleApprove}
                    onError={handleError}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full mt-6 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition"
                onClick={(e) => {
                  handleAddOrder(e);
                }}
                disabled={products.length === 0}
              >
                Đặt hàng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
