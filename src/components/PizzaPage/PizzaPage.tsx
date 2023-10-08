import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { setAddToCartFetching } from '../../redux/slices/mainSlice';

import { TypedUseSelectorHook } from 'react-redux';

import PizzaBlockSelector from '../PizzaItem/PizzaBlockSelector';
import { addPizzaToCart, changePizzaInCart, setCartData } from '../../redux/slices/cartSlice';
import Loading from '../../assets/loading/Loading';
import NotFoundBlock from '../NotFound/NotFoundBlock';

interface IPizzaInfo {
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  id: string;
}

export interface IPizzaForOrder extends Omit<IPizzaInfo, 'types' | 'sizes' | 'id'> {
  dough: number;
  size: number;
  parentId: string;
}

export interface IPizzaInfoInCart extends IPizzaForOrder {
  id: string;
  pizzaCount: number;
}

const PizzaPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { pizzaId } = useParams();

  const [pizza, setPizza] = useState<IPizzaInfo>();
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://64664fd5ba7110b6639d831f.mockapi.io/pizzas/' + pizzaId)
      .then((res) => setPizza(res.data))
      .catch((err) => setNotFound(true));

    axios
      .get('https://64664fd5ba7110b6639d831f.mockapi.io/cart')
      .then((res) => res.data)
      .then((data) => {
        dispatch(setCartData(data));
      });
  }, []);

  const [active, setActive] = React.useState<[string | null, number | null]>([null, null]); // [0] - dough, [1] - size

  const { addToCartFetchingArr } = useAppSelector((state) => state.main);
  const cartList = useAppSelector((state) => state.cart.cartList);

  if (!pizzaId) {
    return <NotFoundBlock />;
  }

  const isFetching = addToCartFetchingArr.indexOf(pizzaId) !== -1;

  // add to cart;
  const onAddToCart = (item: IPizzaForOrder) => {
    debugger;
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
      const searchCurrPizzaInArr: IPizzaInfoInCart[] = cartList.filter(
        (elem: IPizzaInfoInCart) =>
          elem.size === size && elem.dough === dough && elem.parentId === parentId,
      );
      console.log(searchCurrPizzaInArr);
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

  const setDough = (dough: string, typeNames: string[]) => {
    if (dough === active[0]) {
      setActive((prev) => {
        console.log(prev);
        let res: [string | null, number | null] = [...prev];
        res[0] = null;
        return res;
      });
    } else {
      if (pizza && pizza.types.indexOf(typeNames.indexOf(dough)) >= 0) {
        setActive((prev) => {
          let res: [string | null, number | null] = [...prev];
          res[0] = dough;
          return res;
        });
      }
    }
  };

  const setSize = (size: number) => {
    if (size === active[1]) {
      setActive((prev) => {
        let res: [string | null, number | null] = [...prev];
        res[1] = null;
        return res;
      });
    } else {
      if (pizza && pizza.sizes.indexOf(size) >= 0) {
        setActive((prev) => {
          let res: [string | null, number | null] = [...prev];
          res[1] = size;
          return res;
        });
      }
    }
  };

  const onClickAddToCart = (typeNames: string[]) => {
    debugger;
    if (active[0] === null || active[1] === null) {
      if (active[0] === null && active[1] === null) {
        alert('Ошибка! Выберите размер пиццы и тесто');
      } else {
        alert(`Ошибка! Выберите ${active[0] === null ? 'тесто' : 'размер пиццы'}`);
      }
    } else {
      if (pizza) {
        console.log(pizza);
        onAddToCart({
          parentId: pizza.id,
          imageUrl: pizza.imageUrl,
          title: pizza.title,
          dough: typeNames.indexOf(active[0]),
          size: active[1],
          price: pizza.price,
        });
      }
    }
  };

  if (!pizza && !notFound) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  return (
    // const { title, types, sizes, price, imageUrl, id } = pizza;
    <div className="container">
      {notFound || !pizza ? (
        <NotFoundBlock />
      ) : (
        <div className="pizza-page">
          <div className="pizza-page__image-wrap">
            <img className="pizza-page__image" src={pizza.imageUrl} alt="pizza" />
          </div>
          <div className="pizza-page__info">
            <h1>{pizza.title}</h1>
            <div className="pizza-block">
              <div>
                <PizzaBlockSelector
                  setDough={setDough}
                  types={pizza.types}
                  active={active}
                  sizes={pizza.sizes}
                  setSize={setSize}
                  price={pizza.price}
                  onClickAddToCart={onClickAddToCart}
                  isFetching={isFetching}
                />
              </div>
            </div>
            <div className="cart__bottom-buttons">
              <NavLink to={'/'} className="button button--outline button--add go-back-btn">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 13L1 6.93015L6.86175 1"
                    stroke="#D3D3D3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"></path>
                </svg>
                <span>Вернуться назад</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaPage;
