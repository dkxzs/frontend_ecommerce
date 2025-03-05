import axios from "../utils/axiosCustomize";

const getAllProduct = async () => {
  const res = await axios.get(`/product/get-all-product`);
  return res.data;
};

const getAllProductWithLimit = async (limit) => {
  const res = await axios.get(`/product/get-all-product?limit=${limit}`);
  return res.data;
};

const createProduct = async (data) => {
  const res = await axios.post("/product/create-product", data);
  return res.data;
};

const getDetailProduct = async (id) => {
  const res = await axios.get(`/product/get-detail-product/${id}`);
  return res.data;
};

const updateProduct = async (id, data) => {
  const res = await axios.put(`/product/update-product/${id}`, data);
  return res.data;
};

const deleteProduct = async (id) => {
  const res = await axios.delete(`/product/delete-product/${id}`);
  return res.data;
};

const getAllNewProduct = async () => {
  const res = await axios.get(`/product/get-all-new-product`);
  return res.data;
};

const getAllTypeProduct = async () => {
  const res = await axios.get(`/product/get-all-type`);
  return res.data;
};

export {
  getAllProduct,
  createProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
  getAllProductWithLimit,
  getAllNewProduct,
  getAllTypeProduct,
};
