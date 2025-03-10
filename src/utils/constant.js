const orderContant = {
  delivery: {
    fast: "FAST",
    standard: "STANDARD",
  },
  payment: {
    cash: "Thanh toán tiền mặt khi nhận hàng",
    PayPal: "Thanh toán bằng paypal",
  },
};

const convertDataChart = (data, key) => {
  try {
    const object = {};
    Array.isArray(data) &&
      data.forEach((item) => {
        if (object[item[key]]) {
          object[item[key]] += 1;
        } else {
          object[item[key]] = 1;
        }
      });
    return Object.keys(object).map((k) => ({
      name: k,
      value: object[k],
    }));
  } catch (error) {
    console.log(error);
  }
};

export { orderContant, convertDataChart };
