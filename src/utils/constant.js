import axios from "axios";

const getProvince = async () => {
  let data = await axios.get("https://open.oapi.vn/location/provinces");
  return data;
};

export { getProvince };
