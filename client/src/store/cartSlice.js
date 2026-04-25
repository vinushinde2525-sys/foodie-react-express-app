import { createSlice } from '@reduxjs/toolkit';

const TAX_RATE = 0.05;
const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 499;

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isDrawerOpen: false,
  },
  reducers: {
    addToCart(state, action) {
      const food = action.payload;
      const existing = state.items.find((i) => i.id === food.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...food, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
    toggleCartDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    closeCartDrawer(state) {
      state.isDrawerOpen = false;
    },
    openCartDrawer(state) {
      state.isDrawerOpen = true;
    },
  },
});

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectCartItems    = (s) => s.cart.items;
export const selectCartCount    = (s) => s.cart.items.reduce((t, i) => t + i.quantity, 0);
export const selectCartSubtotal = (s) => s.cart.items.reduce((t, i) => t + i.price * i.quantity, 0);
export const selectCartTax      = (s) => Math.round(selectCartSubtotal(s) * TAX_RATE);
export const selectDeliveryFee  = (s) => (selectCartSubtotal(s) >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE);
export const selectCartTotal    = (s) => selectCartSubtotal(s) + selectCartTax(s) + selectDeliveryFee(s);
export const selectIsDrawerOpen = (s) => s.cart.isDrawerOpen;
export const selectIsInCart     = (id) => (s) => s.cart.items.some((i) => i.id === id);

export const {
  addToCart, removeFromCart, increaseQty, decreaseQty,
  clearCart, toggleCartDrawer, closeCartDrawer, openCartDrawer,
} = cartSlice.actions;

export default cartSlice.reducer;
