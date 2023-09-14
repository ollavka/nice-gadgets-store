/* eslint-disable */
import { FC, useMemo } from 'react';
import { AddToFavoriteButton } from '../Buttons/AddToFavoriteButton';
import { Product, ProductDetails } from '../../types';
import { AddToCartButton } from '../Buttons/AddToCartButton';
import styles from './ButtonsFunctionality.module.scss';

type Props = {
  productDetails: ProductDetails;
  product: Product;
};

export const ButtonsFunctionality: FC<Props> = ({
  product,
  productDetails,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__price}>
        <span className={styles.card__price__now}>
          {`$${productDetails.priceDiscount}`}
        </span>
        <span className={styles.card__price__old}>
          {`$${productDetails.priceRegular}`}
        </span>
      </div>
      <div className={styles.card__buttons}>
        <AddToCartButton
          product={product}
          className={styles.buttonCart}
          title={productDetails.name}
        />
        <AddToFavoriteButton
          className={styles.buttonFavorite}
          product={product}
        />
      </div>
      <ul className={styles.card__characteristics}>
        <li className={styles.characteristic}>
          <span className={styles.characteristicTitle}>Screen</span>
          <span className={styles.characteristicValue}>
            {productDetails.screen || '-'}
          </span>
        </li>
        <li className={styles.characteristic}>
          <span className={styles.characteristicTitle}>Resolution</span>
          <span className={styles.characteristicValue}>
            {productDetails.capacity || '-'}
          </span>
        </li>
        <li className={styles.characteristic}>
          <span className={styles.characteristicTitle}>Processor</span>
          <span className={styles.characteristicValue}>
            {productDetails.processor || '-'}
          </span>
        </li>
        <li className={styles.characteristic}>
          <span className={styles.characteristicTitle}>RAM</span>
          <span className={styles.characteristicValue}>
            {productDetails.ram || '-'}
          </span>
        </li>
      </ul>
    </div>
  );
};
