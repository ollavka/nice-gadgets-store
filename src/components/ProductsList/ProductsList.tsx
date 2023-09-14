/* eslint-disable react/require-default-props */
import { FC } from 'react';
import cn from 'classnames';
import { Product } from '../../types';
import { CardLayout } from '../CardLayout';
import styles from './ProductsList.module.scss';

type Props = {
  className?: string;
  products: Product[];
};

export const ProductsList: FC<Props> = ({ className = '', products }) => (
  <ul className={cn(styles.productList, className)}>
    {products.map((product) => (
      <li key={product.id} className={styles.productCard}>
        <CardLayout item={product} />
      </li>
    ))}
  </ul>
);
