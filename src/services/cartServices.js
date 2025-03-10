import axios from "../utils/axiosCustomize";

const updateCart = async (id, data) => {
  let res = await axios.put(`/cart/update-cart/${id}`, data);
  return res.data;
};

const getCart = async (id) => {
  let res = await axios.get(`/cart/get-cart/${id}`);
  return res.data;
};

export { updateCart, getCart };
