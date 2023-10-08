import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slices/mainSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
