import React from 'react';
import style from './NotFoundBlock.module.scss';
import { NavLink } from 'react-router-dom';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={style.notFound}>
      <div className={style.notFoundText}>
        <h1 className={style.title}>404</h1>
        <h2 className={style.subtitle}>Такой страницы нет</h2>
        <h3 className={style.linksTitle}>Но есть другие страницы:</h3>
        <ul className={style.linksList}>
          <li className={style.link}>
            <NavLink to="/">Главная</NavLink>
          </li>
          <li className={style.link}>
            <NavLink to="/cart">Корзина</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFoundBlock;
