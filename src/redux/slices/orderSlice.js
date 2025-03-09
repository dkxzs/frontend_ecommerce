import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  selectedItemOrders: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item.product === orderItem.product
      );
      if (itemOrder) {
        itemOrder.amount++;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    increaseAmount: (state, action) => {
      const { productId } = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item.product === productId
      );
      if (itemOrder) {
        itemOrder.amount += 1;
      }
    },
    decreaseAmount: (state, action) => {
      const { productId } = action.payload;
      const itemOrder = state.orderItems.find(
        (item) => item.product === productId
      );
      if (itemOrder) {
        itemOrder.amount -= 1;
      }
    },
    removeOrderProduct: (state, action) => {
      const { productId } = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => item.product !== productId
      );
    },
    removeAllOrderProduct: (state, action) => {
      const { listCheck } = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => !listCheck.includes(item.product)
      );
    },
    selectedOrder: (state, action) => {
      state.selectedItemOrders = action.payload;
    },
    removeAllSelectedOrder: (state) => {
      state.selectedItemOrders = [];
    },
  },
});

export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
  removeAllSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
