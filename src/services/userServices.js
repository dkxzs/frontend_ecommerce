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

export { loginUser, registerUser, getDetailUser, refreshToken, logoutUser };
