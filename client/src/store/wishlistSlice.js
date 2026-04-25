import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] },
  reducers: {
    toggleWishlist(state, action) {
      const food = action.payload;
      const idx = state.items.findIndex((i) => i.id === food.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(food);
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const selectWishlistItems  = (s) => s.wishlist.items;
export const selectWishlistCount  = (s) => s.wishlist.items.length;
export const selectIsWishlisted   = (id) => (s) => s.wishlist.items.some((i) => i.id === id);

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
