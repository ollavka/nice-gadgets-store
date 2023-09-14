/* eslint-disable import/no-cycle */
import { CategoryMap, Product } from '.';

export interface ApiData {
  items: Product[];
  countByGroup: CategoryMap;
}
