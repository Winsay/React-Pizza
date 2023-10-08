import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch } from '../../Hooks/hooks';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface ISortProps {
  currentSortValue: number | string;
  setCurrentSortValue: ActionCreatorWithPayload<number | string, 'main/setCurrentSortValue'>;
}

const Sort: React.FC<ISortProps> = (props) => {
  interface ISortList {
    [key: string]: string;
    rating: string;
    price: string;
    title: string;
    notSorted: string;
  }

  const dispatch = useAppDispatch();
  const sortList: ISortList = {
    notSorted: 'не сорировано',
    rating: 'популярности',
    price: 'цене',
    title: 'алфавиту',
  };

  const [popupToggle, setPopupToggle] = React.useState(false);

  // Проблема с обьектом

  const onSorting = (value: string | number) => {
    if (value === 'notSorted') {
      value = 0;
    }
    setPopupToggle(false);
    dispatch(props.setCurrentSortValue(value));
    // props.sortingProcess(value);
  };

  useEffect(() => {
    return () => {
      setPopupToggle(false);
    };
  }, []);

  return (
    <div tabIndex={1} onBlur={() => setPopupToggle(false)} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setPopupToggle((prev) => !prev)}>
          {props.currentSortValue ? sortList[props.currentSortValue] : 'не сортировано'}
        </span>
      </div>
      <CSSTransition in={popupToggle} timeout={300} classNames="alert" unmountOnExit>
        <div className="sort__popup">
          <ul>
            {Object.keys(sortList).map((item, index) => {
              return (
                <li onClick={() => onSorting(item)} key={index}>
                  {sortList[item]}
                </li>
              );
            })}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};
export default Sort;
