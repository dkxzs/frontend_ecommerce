import axios from "../utils/axiosCustomize";
const loginUser = async (email, password) => {
  const res = await axios.post("/user/sign-in", { email, password });
  return res.data;
};

const registerUser = async (name, email, password) => {
  const res = await axios.post("/user/sign-up", { name, email, password });
  return res.data;
};

export { loginUser, registerUser };
