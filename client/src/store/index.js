import { configureStore } from '@reduxjs/toolkit';
import cartReducer    from './cartSlice';
import wishlistReducer from './wishlistSlice';
import uiReducer      from './uiSlice';

export const store = configureStore({
  reducer: {
    cart:     cartReducer,
    wishlist: wishlistReducer,
    ui:       uiReducer,
  },
});
