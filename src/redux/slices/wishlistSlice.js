import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlistProduct: (state, action) => {
      const { wishlistItem } = action.payload;
      if (
        !state.wishlistItems.some(
          (item) => item.product === wishlistItem.product
        )
      ) {
        state.wishlistItems.push(wishlistItem);
      }
    },
    removeWishlistProduct: (state, action) => {
      const { productId } = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.product !== productId
      );
    },
  },
});

export const { addWishlistProduct, removeWishlistProduct } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
