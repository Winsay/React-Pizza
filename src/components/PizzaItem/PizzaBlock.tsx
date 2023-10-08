import React from 'react';
import { useState } from 'react';
import PizzaBlockSelector from './PizzaBlockSelector';
import { NavLink } from 'react-router-dom';

import { IPizzaForOrder } from '../PizzaPage/PizzaPage';

export interface IPizzaBlockProps {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  onAddToCart: (item: IPizzaForOrder) => void;
  addToCartFetchingArr: string[];
  category: number;
  rating: number;
}

const Pizza: React.FC<IPizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  category,
  rating,
  onAddToCart,
  addToCartFetchingArr,
}) => {
  const [active, setActive] = useState<[string | null, number | null]>([null, null]); // [0] - dough, [1] - size

  const isFetching = addToCartFetchingArr.indexOf(id) !== -1;

  const setDough = (dough: string, typeNames: string[]) => {
    if (dough === active[0]) {
      setActive((prev) => {
        let res: [string | null, number | null] = [...prev];
        res[0] = null;
        return res;
      });
    } else {
      if (types.indexOf(typeNames.indexOf(dough)) >= 0) {
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
      if (sizes.indexOf(size) >= 0) {
        setActive((prev) => {
          let res: [string | null, number | null] = [...prev];
          res[1] = size;
          return res;
        });
      }
    }
  };

  const onClickAddToCart = (typeNames: string[]) => {
    if (active[0] === null || active[1] === null) {
      if (active[0] === null && active[1] === null) {
        alert('Ошибка! Выберите размер пиццы и тесто');
      } else {
        alert(`Ошибка! Выберите ${active[0] === null ? 'тесто' : 'размер пиццы'}`);
      }
    } else {
      onAddToCart({
        parentId: id,
        imageUrl,
        title,
        dough: typeNames.indexOf(active[0]),
        size: active[1],
        price,
      });
    }
  };

  return (
    <div className="pizza-block-wrapper">
      <NavLink to={`/pizza/${id}`}>
        <div className="pizza-block">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
          <PizzaBlockSelector
            setDough={setDough}
            types={types}
            active={active}
            sizes={sizes}
            setSize={setSize}
            price={price}
            onClickAddToCart={onClickAddToCart}
            isFetching={isFetching}
          />
        </div>
      </NavLink>
    </div>
  );
};

export default Pizza;
