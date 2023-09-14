import { ProductCategory } from './ProductCategory';

export type CategoryMap = {
  [key in ProductCategory]: number;
};
