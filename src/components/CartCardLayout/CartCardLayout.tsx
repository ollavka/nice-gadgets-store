/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useContext } from 'react';
import cn from 'classnames';
import { ButtonType, Product } from '../../types';
import { Button } from '../Buttons/Button';
import { useAppDispatch } from '../../redux/hooks';
import * as cartService from '../../redux/slices/cartSlice';

import styles from './CartCardLayout.module.scss';
import btnStyles from '../Buttons/Button/Button.module.scss';

import minus from '../../assets/icons/minus.svg';
import grayMinus from '../../assets/icons/gray-minus.svg';
import grayMinusDark from '../../assets/icons-dark/Minus.svg';
import plus from '../../assets/icons/plus.svg';
import plusDark from '../../assets/icons-dark/Plus.svg';
import { ThemeContext } from '../../context/ThemeContext';
import { normalizeImage } from '../../helpers/normalizeImage';

type Props = {
  product: Product;
  count: number;
};

export const CartCardLayout: FC<Props> = ({ product, count }) => {
  const dispatch = useAppDispatch();

  const addOneToOrder = () => {
    dispatch(cartService.addOneModel(product));
  };

  const removeOneFromOrder = () => {
    dispatch(cartService.removeOneModel(product));
  };

  const removeAllFromOrder = () => {
    dispatch(cartService.removeModelsByType(product));
  };

  const minusBtnIsDisabled = count <= 1;

  const imagePath = normalizeImage(product.image);

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';
  const currentMinusIconlight = minusBtnIsDisabled ? grayMinus : minus;
  const currentMinusIcondark = minusBtnIsDisabled ? minus : grayMinusDark;
  const currentMinus = isThemeModeDark
    ? currentMinusIcondark
    : currentMinusIconlight;
  const currentPlus = isThemeModeDark ? plusDark : plus;

  return (
    <div className={styles.card}>
      <div className={styles.card__firstBlock}>
        <button
          type="button"
          className={styles.card__delete}
          onClick={removeAllFromOrder}
        />
        <img
          className={styles.card__photo}
          src={imagePath}
          alt={product.name}
        />
        <h2 className={styles.card__title}>{product.name}</h2>
      </div>
      <div className={styles.card__secondBlock}>
        <div className={styles.card__button}>
          <Button
            iconPath={currentMinus}
            className={cn(styles.card__button__minus, {
              [btnStyles.disabled]: minusBtnIsDisabled,
            })}
            onClick={removeOneFromOrder}
            type={ButtonType.Button}
          />

          <span className={styles.card__button__count}>{count}</span>

          <Button
            iconPath={currentPlus}
            className={styles.card__button__plus}
            onClick={addOneToOrder}
            type={ButtonType.Button}
          />
        </div>
        <span className={styles.card__price}>{`$${product.price}`}</span>
      </div>
    </div>
  );
};
