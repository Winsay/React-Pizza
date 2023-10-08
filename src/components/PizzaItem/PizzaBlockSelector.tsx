import React from 'react';

interface IPizzaSelectorProps {
  setDough: (dough: string, typeNames: string[]) => void;
  types: number[];
  active: [string | null, number | null];
  setSize: (size: number) => void;
  sizes: number[];
  price: number;
  onClickAddToCart: (typeNames: string[]) => void;
  isFetching: boolean;
}

const PizzaBlockSelector: React.FC<IPizzaSelectorProps> = ({
  setDough,
  types,
  active,
  setSize,
  sizes,
  price,
  onClickAddToCart,
  isFetching,
}) => {
  const typeNames = ['тонкое', 'традиционное'];
  const pizzaSizes = [26, 30, 40];

  return (
    <>
      <div onClick={(e) => e.preventDefault()} className="pizza-block__selector">
        <ul>
          {typeNames.map((item, index) => (
            <li
              onClick={() => setDough(item, typeNames)}
              className={
                types.indexOf(index) === -1 ? 'inactive' : active[0] === item ? 'active' : ''
              }
              key={index}>
              {item}
            </li>
          ))}
        </ul>
        <ul>
          {pizzaSizes.map((elem, index) => (
            <li
              onClick={() => setSize(elem)}
              className={
                sizes.indexOf(elem) === -1 ? 'inactive' : elem === active[1] ? 'active' : ''
              }
              key={index}>
              {elem} см.
            </li>
          ))}
        </ul>
      </div>
      <div onClick={(e) => e.preventDefault()} className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          onClick={() => onClickAddToCart(typeNames)}
          className={`button button--outline button--add ${isFetching ? 'button--disabled' : ''}`}>
          {!isFetching ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
          ) : (
            ''
          )}
          <span>{isFetching ? 'Добавление...' : 'Добавить'}</span>
        </div>
      </div>
    </>
  );
};

export default PizzaBlockSelector;
