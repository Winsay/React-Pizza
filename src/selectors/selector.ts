import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

export const getCurrentCategory = (state: RootState) => state.main.currentCategory;
const getCurrentSortValue = (state: RootState) => state.main.currentSortValue;
const getPizzasData = (state: RootState) => state.main.pizzasData;
const getCurrentPage = (state: RootState) => state.main.currentPage;
const getIsLoading = (state: RootState) => state.main.isLoading;
const getAddToCartFetchingArr = (state: RootState) => state.main.addToCartFetchingArr;
const getPizzaList = (state: RootState) => state.main.pizzaList;
const getSearchValue = (state: RootState) => state.main.searchValue;

export const getAllMainData = createSelector(
  [
    getCurrentCategory,
    getCurrentSortValue,
    getPizzasData,
    getCurrentPage,
    getIsLoading,
    getAddToCartFetchingArr,
    getPizzaList,
    getSearchValue,
  ],
  (
    currentCategory,
    currentSortValue,
    pizzasData,
    currentPage,
    isLoading,
    addToCartFetchingArr,
    pizzaList,
    searchValue,
  ) => {
    return {
      currentCategory,
      currentSortValue,
      pizzasData,
      currentPage,
      isLoading,
      addToCartFetchingArr,
      pizzaList,
      searchValue,
    };
  },
);
