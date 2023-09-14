import { Product } from '../types';

export const getTotalPrice = (products: Product[]) => {
  return products.reduce((total, product) => {
    return total + product.price;
  }, 0);
};
