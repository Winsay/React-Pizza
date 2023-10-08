import React from 'react';
import style from './Search.module.scss';
import { setSearchValue, setCurrentPage } from '../../redux/slices/mainSlice';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';

export default function Search() {
  let searchValue = useAppSelector((state) => state.main.searchValue);
  let dispatch = useAppDispatch();

  const changeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
    dispatch(setCurrentPage(0));
  };

  return (
    <div className={style.search}>
      <input
        onChange={(e) => changeSearchValue(e)}
        value={searchValue}
        className={style.searchInput}
        placeholder="Поиск пиццы..."
        type="text"
      />
      <svg
        className={style.searchIco}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 26 26"
        id="Слой_1"
        version="1.1"
        viewBox="0 0 26 26">
        <path
          d="M14.9462891,1C9.4033203,1,4.8935547,5.5097656,4.8935547,11.0532227  c0,2.5022583,0.9248047,4.7885132,2.4428101,6.5498657l-6.1166382,6.1166382c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266l6.1165771-6.1165771  c1.7612305,1.5180054,4.0474243,2.442749,6.5494385,2.442749C20.4902344,21.1064453,25,16.5966797,25,11.0532227  S20.4902344,1,14.9462891,1z M14.9462891,19.6064453c-4.7158203,0-8.5527344-3.8369141-8.5527344-8.5532227  S10.2304688,2.5,14.9462891,2.5C19.6630859,2.5,23.5,6.3369141,23.5,11.0532227S19.6630859,19.6064453,14.9462891,19.6064453z"
          fill="#1D1D1B"
        />
      </svg>
      <svg
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setSearchValue(''));
        }}
        className={style.cleanIco}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 26 26"
        id="Слой_1"
        version="1.1"
        viewBox="0 0 26 26">
        <path
          d="M14.0605469,13L24.7802734,2.2802734c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469  s-0.7675781-0.2929688-1.0605469,0L13,11.9394531L2.2802734,1.2197266c-0.2929688-0.2929688-0.7675781-0.2929688-1.0605469,0  s-0.2929688,0.7675781,0,1.0605469L11.9394531,13L1.2197266,23.7197266c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266L13,14.0605469l10.7197266,10.7197266  C23.8662109,24.9267578,24.0576172,25,24.25,25s0.3837891-0.0732422,0.5302734-0.2197266  c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469L14.0605469,13z"
          fill="#1D1D1B"
        />
      </svg>
    </div>
  );
}
