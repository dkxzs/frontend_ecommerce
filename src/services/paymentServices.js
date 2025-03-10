import axios from "../utils/axiosCustomize";

const getClientIdKey = async () => {
  let res = await axios.get("/payment/config");
  return res.data;
};

export { getClientIdKey };
