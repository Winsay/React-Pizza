import React from 'react';

const EmptyCart = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пуста <span>😕</span>
      </h2>
      <p>Для того чтобы заказать пиццу перейдите на главную страницу</p>
      <img src="/img/emptyCart.png" alt="Empty cart" />
      <a className="button button--black" href="/">
        <span>Перейти на главную</span>
      </a>
    </div>
  );
};
export default EmptyCart;
