import React, { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import useMatchMedia from 'use-match-media-hook';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';

import Search from '../Search/Search';
import HeaderCart from './HeaderCart';
import { recalculationPriceAndCount } from '../../redux/slices/cartSlice';
import { setFilters } from '../../redux/slices/mainSlice';
import logo from '../../assets/image/pizza-logo.svg';

const queries = ['(max-width: 950px)', '(max-width: 730px)'];

export default function Header() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [tablet, phone] = useMatchMedia(queries);
  const [burgerToggle, setBurgerToggle] = useState(false);

  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const totalPizzasCount = useAppSelector((state) => state.cart.totalPizzasCount);
  const cartList = useAppSelector((state) => state.cart.cartList);

  const handleClick = (e: any) => {
    console.log(e.target);
    setBurgerToggle(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  React.useEffect(() => {
    dispatch(recalculationPriceAndCount());
  }, [cartList]);

  React.useEffect(() => {
    setBurgerToggle(false);
  }, [pathname]);

  return (
    <>
      <div className="header">
        <div className="container">
          <NavLink
            onClick={() =>
              dispatch(
                setFilters({
                  sort: '0',
                  category: '0',
                  currentPage: '0',
                }),
              )
            }
            to="/">
            <div className="header__logo">
              <img width="38" src={logo} alt="Pizza logo" />{' '}
              {/* src before ==>  img/pizza-logo.svg */}
              <div>
                <h1>React Pizza</h1>
                <p>самая вкусная пицца во вселенной</p>
              </div>
            </div>
          </NavLink>
          {phone ? (
            pathname !== '/cart' ? (
              <>
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setBurgerToggle((prev) => {
                      return !prev;
                    });
                  }}
                  className={`burgerMenuBtn ${burgerToggle ? 'active' : ''}`}>
                  <span />
                </div>
                {/* drawer here */}
              </>
            ) : (
              ''
            )
          ) : //
          tablet ? (
            <>
              <div className="header__cart">
                {pathname !== '/cart' && (
                  <NavLink to="/cart" className="button button--cart">
                    <span>{totalPrice} ₽</span>
                    <div className="button__delimiter"></div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{totalPizzasCount}</span>
                  </NavLink>
                )}
              </div>
              {pathname === '/' && <Search />}
            </>
          ) : (
            <>
              {pathname === '/' && <Search />}
              <div className="header__cart">
                {pathname !== '/cart' && (
                  <NavLink to="/cart" className="button button--cart">
                    <span>{totalPrice} ₽</span>
                    <div className="button__delimiter"></div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{totalPizzasCount}</span>
                  </NavLink>
                )}
              </div>
            </>
          )}
          {/*  */}
        </div>
      </div>
      {phone ? (
        <CSSTransition in={burgerToggle} timeout={300} classNames="alert" unmountOnExit>
          <>
            <div onMouseDown={(e) => e.stopPropagation()} className="burgerMenu">
              {pathname === '/' ? <Search /> : ''}
              <HeaderCart totalPrice={totalPrice} totalPizzasCount={totalPizzasCount} />
            </div>
            {/* Надо сделать дравер как-то */}
            <div className="drawer" />
          </>
        </CSSTransition>
      ) : (
        ''
      )}
    </>
  );
}
