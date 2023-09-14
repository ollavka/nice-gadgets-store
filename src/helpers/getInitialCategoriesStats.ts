/* eslint-disable no-param-reassign */
import { CategoryMap, ProductCategory } from '../types';

export const getInitialCategoriesStats = () => {
  const productsCount: CategoryMap = Object.values(ProductCategory).reduce(
    (total, category) => {
      total[category] = 0;

      return total;
    },
    {} as CategoryMap,
  );

  return productsCount;
};
