import axios from "../utils/axiosCustomize";
import refreshInstance from "../utils/refreshInstance";
const loginUser = async (email, password) => {
  const res = await axios.post("/user/sign-in", { email, password });
  return res.data;
};

const registerUser = async (name, email, password) => {
  const res = await axios.post("/user/sign-up", { name, email, password });
  return res.data;
};

const getDetailUser = async (id) => {
  try {
    const res = await axios.get(`/user/get-detail-user/${id}`);
    return res.data;
  } catch (err) {
    console.log("có lỗi xảy ra: ", err);
  }
};

const refreshToken = async () => {
  try {
    const res = await refreshInstance.post("/user/refresh-token");
    return res.data;
  } catch (err) {
    console.log("có lỗi xảy ra: ", err);
  }
};

const logoutUser = async () => {
  const res = await axios.post("/user/log-out");
  return res.data;
};

const updateUser = async (id, data) => {
  const res = await axios.put(`/user/update-user/${id}`, data);
  return res.data;
};

const getAllUsers = async () => {
  const res = await axios.get("/user/get-all-user");
  return res.data;
};

const deleteUser = async (id) => {
  const res = await axios.delete(`/user/delete-user/${id}`);
  return res.data;
};

export {
  loginUser,
  registerUser,
  getDetailUser,
  refreshToken,
  logoutUser,
  updateUser,
  getAllUsers,
  deleteUser,
};
