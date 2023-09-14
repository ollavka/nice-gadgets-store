/* eslint-disable import/no-extraneous-dependencies */
import { FC, useMemo, useContext } from 'react';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { ButtonType, Product } from '../../../types';
import { Button } from '../Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectFavorites } from '../../../redux/selectors';
import * as favoritesService from '../../../redux/slices/favoritesSlice';

import styles from './AddToFavoriteButton.module.scss';
import notifStyles from '../../../styles/utils/notification.module.scss';
import buttonStyles from '../Button/Button.module.scss';
import { ThemeContext } from '../../../context/ThemeContext';

type Props = {
  product: Product;
  className?: string;
};

export const AddToFavoriteButton: FC<Props> = ({ product, className = '' }) => {
  const dispatch = useAppDispatch();

  const favoriteProducts = useAppSelector(selectFavorites);

  const isFavoriteProduct = useMemo(
    () => favoriteProducts.some(({ itemId }) => itemId === product.itemId),
    [favoriteProducts, product],
  );

  const toggleFavoriteProduct = () => {
    if (!isFavoriteProduct) {
      dispatch(favoritesService.add(product));

      toast.success(
        'You have successfully added a product to your favorites!',
        {
          bodyClassName: notifStyles.notification,
        },
      );

      return;
    }

    dispatch(favoritesService.remove(product.id));

    toast.success(
      'You have successfully removed the product from your favorites',
      {
        bodyClassName: notifStyles.notification,
      },
    );
  };

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';
  const icon = isThemeModeDark
    ? styles.AddToFavBtnIconDark
    : styles.AddToFavBtnIcon;

  return (
    <Button
      type={ButtonType.Button}
      className={cn(styles.AddToFavBtn, className, {
        [buttonStyles.element]: isFavoriteProduct,
      })}
      onClick={toggleFavoriteProduct}
    >
      <div
        className={cn(icon, {
          [styles.selected]: isFavoriteProduct,
        })}
      />
    </Button>
  );
};
