import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';
import { useAppDispatch } from '../../Hooks/hooks';
import { setCurrentPage } from '../../redux/slices/mainSlice';
import { IPizzaData } from '../../redux/slices/mainSlice';

interface IPaginationProps {
  currentPage: number;
  afterSerchingData: IPizzaData[];
}

const Pagination: React.FC<IPaginationProps> = ({ afterSerchingData, currentPage }) => {
  const dispatch = useAppDispatch();
  const handlePageClick = (event: { selected: number }) => {
    console.log(event);
    dispatch(setCurrentPage(event.selected));
  };

  return (
    <ReactPaginate
      activeClassName={style.pageActive}
      disabledClassName={style.disabledNextPrev}
      pageClassName={style.page}
      previousClassName={style.prev}
      nextClassName={style.next}
      className={style.paginator}
      breakLabel="..."
      nextLabel=">>"
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      pageCount={Math.ceil(afterSerchingData.length / 4)}
      previousLabel="<<"
      renderOnZeroPageCount={null}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
