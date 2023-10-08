import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPizzaBlockProps } from '../../components/PizzaItem/PizzaBlock';

export interface IPizzaData extends Omit<IPizzaBlockProps, 'onAddToCart' | 'addToCartFetchingArr'> {
  [key: string]: any;
}

interface IMainState {
  isLoading: boolean;
  addToCartFetchingArr: string[];
  pizzasData: IPizzaData[];
  pizzaList: IPizzaData[];
  currentSortValue: number | string;
  currentCategory: number;
  currentPage: number;
  searchValue: string;
}

const initialState: IMainState = {
  isLoading: true,
  addToCartFetchingArr: [],
  pizzasData: [],
  pizzaList: [],
  currentSortValue: 0,
  currentCategory: 0,
  currentPage: 0,
  searchValue: '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPizzasData: (state, action: PayloadAction<IPizzaData[]>) => {
      state.pizzasData = action.payload;
      state.pizzaList = action.payload;
    },
    setPizzaList: (state, action: PayloadAction<IPizzaData[]>) => {
      state.pizzaList = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentSortValue: (state, action: PayloadAction<number | string>) => {
      state.currentSortValue = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{ category: string; currentPage: string; sort: string }>,
    ) => {
      state.currentCategory = Number(action.payload.category);
      state.currentPage = Number(action.payload.currentPage);
      state.currentSortValue =
        Number(action.payload.sort) === 0 || Number(action.payload.sort) ? 0 : action.payload.sort;
    },
    setAddToCartFetching: (state, action: PayloadAction<{ operation: string; id: string }>) => {
      if (action.payload.operation === 'add') {
        state.addToCartFetchingArr = [...state.addToCartFetchingArr, action.payload.id];
      } else if (action.payload.operation === 'remove') {
        state.addToCartFetchingArr = state.addToCartFetchingArr.filter(
          (elem) => elem !== action.payload.id,
        );
      }
    },
  },
});

export const {
  setPizzasData,
  setPizzaList,
  setIsLoading,
  setCurrentPage,
  setCurrentSortValue,
  setSearchValue,
  setCurrentCategory,
  setFilters,
  setAddToCartFetching,
} = mainSlice.actions;

export default mainSlice.reducer;
