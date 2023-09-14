/* eslint-disable react/require-default-props */
import { FC } from 'react';
import cn from 'classnames';
import styles from '../../ProductsList/ProductsList.module.scss';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

type Props = {
  className?: string;
};

export const ProductsListSkeleton: FC<Props> = ({ className = '' }) => (
  <ul className={cn(styles.productList, className)}>
    <li className={styles.productCard}>
      <CardSkeleton />
    </li>

    <li className={styles.productCard}>
      <CardSkeleton />
    </li>

    <li className={styles.productCard}>
      <CardSkeleton />
    </li>

    <li className={styles.productCard}>
      <CardSkeleton />
    </li>
  </ul>
);
