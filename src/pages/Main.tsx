import React, { useCallback } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import Pizza from '../components/PizzaItem/PizzaBlock';
import Preloader from '../assets/preloader/Preloader';
import EmptyPizzaList from '../components/EmptyPizzaList/EmptyPizzaList';
import Pagination from '../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../Hooks/hooks';
import {
  setPizzasData,
  setIsLoading,
  setPizzaList,
  setCurrentPage,
  setCurrentSortValue,
  setSearchValue,
  setFilters,
  setAddToCartFetching,
} from '../redux/slices/mainSlice';
import { setCartData, addPizzaToCart, changePizzaInCart } from '../redux/slices/cartSlice';

import { IPizzaData } from '../redux/slices/mainSlice';
import { IPizzaForOrder } from '../components/PizzaPage/PizzaPage';
import { getAllMainData } from '../selectors/selector';
// import { SearchContext } from '../App';

export default function Main() {
  const dispatch = useAppDispatch();
  const mainData = useAppSelector(getAllMainData);
  const cartList = useAppSelector((state) => state.cart.cartList);
  const navigate = useNavigate();

  // const [pizzaList, setPizzaList] = React.useState([]);
  // const [currentSortValue, setCurrentSortValue] = React.useState(null);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [pizzasData, setPizzasData] = React.useState([]);
  // const [currentPage, setCurrentPage] = React.useState(0);

  // const { searchValue, setSearchValue } = React.useContext(SearchContext);
  React.useEffect(() => {
    dispatch(setIsLoading(true));
    let pizzasData = axios
      .get('https://64664fd5ba7110b6639d831f.mockapi.io/pizzas')
      .then((res) => res.data)
      .then((data) => {
        dispatch(setPizzasData(data));
        // dispatch(setPizzaList(data));
      });

    let cartData = axios
      .get('https://64664fd5ba7110b6639d831f.mockapi.io/cart')
      .then((res) => res.data)
      .then((data) => {
        dispatch(setCartData(data));
      });

    Promise.all([pizzasData, cartData]).then(() => {
      dispatch(setIsLoading(false));
    });
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (window.location.search) {
      console.log(window.location.search);
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({ ...(params as { sort: string; category: string; currentPage: string }) }),
      );
    }
  }, []);

  React.useEffect(() => {
    categoriesSort(mainData.currentCategory);
  }, [mainData.currentSortValue, mainData.currentCategory, mainData.pizzasData]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sort: mainData.currentSortValue,
      category: mainData.currentCategory,
      currentPage: mainData.currentPage,
    });
    navigate(`?${queryString}`);
  }, [mainData.currentPage, mainData.currentSortValue, mainData.currentCategory]);

  // add to cart;
  const onAddToCart = (item: IPizzaForOrder) => {
    let { parentId, imageUrl, title, dough, size, price } = item;
    dispatch(setAddToCartFetching({ operation: 'add', id: parentId }));
    if (cartList.length < 1) {
      try {
        axios
          .post('https://64664fd5ba7110b6639d831f.mockapi.io/cart', {
            parentId,
            imageUrl,
            title,
            size,
            dough,
            pizzaCount: 1,
            price,
          })
          .then((response) => response.data)
          .then((data) => {
            dispatch(addPizzaToCart(data));
            dispatch(setAddToCartFetching({ operation: 'remove', id: parentId }));
            console.log(111111);
          });
      } catch (error) {
        alert('Не удалось добавить пиццу. Попробуйте позже');
      }
    } else {
      const searchCurrPizzaInArr = cartList.filter(
        (elem) => elem.size === size && elem.dough === dough && elem.parentId === parentId,
      );
      if (searchCurrPizzaInArr.length === 0) {
        try {
          axios
            .post('https://64664fd5ba7110b6639d831f.mockapi.io/cart', {
              parentId,
              imageUrl,
              title,
              size,
              dough,
              pizzaCount: 1,
              price,
            })
            .then((response) => response.data)
            .then((data) => {
              dispatch(addPizzaToCart(data));
              dispatch(setAddToCartFetching({ operation: 'remove', id: parentId }));
            });
        } catch (error) {
          alert('Не удалось добавить пиццу. Попробуйте позже');
        }
      } else if (searchCurrPizzaInArr.length > 0) {
        try {
          axios
            .put(
              `https://64664fd5ba7110b6639d831f.mockapi.io/cart/${Number(
                searchCurrPizzaInArr[0].id,
              )}`,
              {
                pizzaCount: searchCurrPizzaInArr[0].pizzaCount + 1,
                price: searchCurrPizzaInArr[0].price + price, // price from mainData
              },
            )
            .then((response) => response.data)
            .then((data) => {
              dispatch(changePizzaInCart(data));
              dispatch(setAddToCartFetching({ operation: 'remove', id: parentId }));
            });
        } catch (error) {
          alert('Не удалось добавить пиццу. Попробуйте позже');
        }
      }
    }
  };
  //add to Cart\\

  // categories and sorting

  const categoriesSort = (category: number) => {
    let dataAfterSelectCategory: IPizzaData[] = [];
    if (category === 0) {
      dataAfterSelectCategory = [...mainData.pizzasData];
    } else {
      dataAfterSelectCategory = [
        ...mainData.pizzasData.filter((item, index) => item.category === category),
      ];
    }
    sortingProcess(mainData.currentSortValue, dataAfterSelectCategory);
    // dispatch(setCurrentPage(dataAfterSelectCategory.length <= 4 ? 0 : mainData.currentPage));
  };

  const sortingProcess = (sortValue: string | number, dataForSort: IPizzaData[] | null = null) => {
    if (sortValue === 0) {
      dispatch(setPizzaList([...(dataForSort ? dataForSort : mainData.pizzaList)]));
    } else {
      dispatch(
        setPizzaList(
          [...(dataForSort ? dataForSort : mainData.pizzaList)].sort((a, b) =>
            sortValue !== 'title'
              ? b[sortValue] - a[sortValue]
              : b[sortValue] > a[sortValue]
              ? -1
              : 0,
          ),
        ),
      );
    }
  };

  const afterSerchingData = mainData.pizzaList.filter((elem) =>
    elem.title.toLowerCase().includes(mainData.searchValue.toLowerCase()),
  );

  // categories and sorting \\

  //pagination

  const afterPaginationData = afterSerchingData.slice(
    mainData.currentPage * 4,
    mainData.currentPage * 4 + 4,
  );

  //pagination\\

  return (
    <div className="container">
      <div onMouseDown={(e) => e.stopPropagation()} className="content__top">
        <Categories />
        <Sort
          setCurrentSortValue={setCurrentSortValue}
          currentSortValue={mainData.currentSortValue}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div
        className={`content__items ${
          afterSerchingData.length < 1 || afterPaginationData.length < 1
            ? 'content__items__empty'
            : ''
        }`}>
        {mainData.isLoading ? (
          [...Array(10)].map((elem, index) => <Preloader key={index} />)
        ) : afterSerchingData.length > 0 && afterPaginationData.length > 0 ? (
          afterPaginationData.map((elem, index) => (
            <Pizza
              key={index}
              {...elem}
              onAddToCart={onAddToCart}
              addToCartFetchingArr={mainData.addToCartFetchingArr}
            />
          ))
        ) : (
          <EmptyPizzaList setCurrentPage={setCurrentPage} setSearchValue={setSearchValue} />
        )}
      </div>
      <Pagination afterSerchingData={afterSerchingData} currentPage={mainData.currentPage} />
    </div>
  );
}
