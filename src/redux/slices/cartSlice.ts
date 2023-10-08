import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPizzaInfoInCart } from '../../components/PizzaPage/PizzaPage';

interface ICartState {
  cartList: IPizzaInfoInCart[];
  totalPrice: number;
  totalPizzasCount: number;
  cartIsLoading: boolean;
  pizzasOnLoading: string[];
  clearCartIsFetching: boolean;
}

const initialState: ICartState = {
  cartList: [],
  totalPrice: 0,
  totalPizzasCount: 0,
  cartIsLoading: true,
  pizzasOnLoading: [],
  clearCartIsFetching: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    setCartData: (state, action: PayloadAction<IPizzaInfoInCart[]>) => {
      state.cartList = action.payload;
    },
    setCartIsLoading: (state, action: PayloadAction<boolean>) => {
      state.cartIsLoading = action.payload;
    },
    recalculationPriceAndCount: (state) => {
      if (state.cartList.length > 0) {
        state.totalPrice = state.cartList.reduce((acc, item) => {
          return acc + item.price;
        }, 0);
        state.totalPizzasCount = state.cartList.reduce((acc, item) => {
          return acc + item.pizzaCount;
        }, 0);
      } else {
        state.totalPrice = 0;
        state.totalPizzasCount = 0;
      }
    },
    addPizzaToCart: (state, action: PayloadAction<IPizzaInfoInCart>) => {
      state.cartList = [...state.cartList, action.payload];
    },
    changePizzaInCart: (state, action: PayloadAction<IPizzaInfoInCart>) => {
      state.cartList = state.cartList.map((item) =>
        item.id === action.payload.id ? (item = action.payload) : item,
      );
    },
    deletingPizzaFromCart: (state, action: PayloadAction<string | undefined>) => {
      console.log(action.payload);
      if (action.payload) {
        state.cartList = state.cartList.filter((item) => item.id !== action.payload);
      } else {
        state.cartList = [];
      }
    },
    setListPizzasOnFetching: (state, action: PayloadAction<{ id: string; operation: string }>) => {
      if (action.payload.operation === 'add') {
        state.pizzasOnLoading = [...state.pizzasOnLoading, action.payload.id];
      } else if (action.payload.operation === 'remove') {
        state.pizzasOnLoading = state.pizzasOnLoading.filter((elem) => elem !== action.payload.id);
      }
    },
    setClearCartFetching: (state, action: PayloadAction<boolean>) => {
      state.clearCartIsFetching = action.payload;
    },
  },
});

export const {
  setCartData,
  setCartIsLoading,
  addPizzaToCart,
  recalculationPriceAndCount,
  changePizzaInCart,
  deletingPizzaFromCart,
  setListPizzasOnFetching,
  setClearCartFetching,
} = cartSlice.actions;

export default cartSlice.reducer;
