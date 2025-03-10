import axios from "../utils/axiosCustomize";
const createOrder = async (data) => {
  let res = await axios.post("/order/create", data);
  return res.data;
};

const getAllOrderByUserId = async (id) => {
  let res = await axios.get(`/order/get-all-order/${id}`);
  return res.data;
};

const getOrderDetailByOrderId = async (id) => {
  try {
    let res = await axios.get(`/order/get-order-detail/${id}`);
    return res.data;
  } catch (err) {
    console.log("có lỗi xảy ra: ", err);
  }
};

const cancelOrder = async (id, orderItems) => {
  let res = await axios.put(`/order/cancel-order/${id}`, {
    data: orderItems,
  });
  return res.data;
};

const getAllOrder = async () => {
  let res = await axios.get("/order/get-all-order");
  return res.data;
};

export {
  createOrder,
  getAllOrderByUserId,
  getOrderDetailByOrderId,
  cancelOrder,
  getAllOrder,
};
