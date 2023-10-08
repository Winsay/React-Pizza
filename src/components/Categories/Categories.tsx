import React, { Dispatch } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { setCurrentCategory, setCurrentPage } from '../../redux/slices/mainSlice';
import { getCurrentCategory } from '../../selectors/selector';

//  interface ICategoriesProps {
//   currentCategory: number;
//   // dispatch:Dispatch<AnyAction>
// }

const Categories: React.FC = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(getCurrentCategory);
  const toggleCategories = (value: number) => {
    dispatch(setCurrentCategory(value));
    dispatch(setCurrentPage(0));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => (
          <li
            key={index}
            onClick={() => toggleCategories(index)}
            className={index === currentCategory ? 'active' : ''}>
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
