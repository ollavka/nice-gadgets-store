/* eslint-disable react/require-default-props */
import { FC, useContext } from 'react';
import { ButtonType } from '../../types';
import { Button } from '../Buttons/Button';
import { useAppSelector } from '../../redux/hooks';
import { selectFavorites } from '../../redux/selectors';

import favorite from '../../assets/icons/like-button.svg';
import favoriteDark from '../../assets/icons-dark/like-button.svg';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  className?: string;
  onClick?: () => void;
};

export const FavoriteLink: FC<Props> = ({ onClick, className = '' }) => {
  const favoriteProducts = useAppSelector(selectFavorites);
  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';

  return (
    <Button
      type={ButtonType.Link}
      to="favorites"
      iconPath={isThemeModeDark ? favoriteDark : favorite}
      className={className}
      badge={favoriteProducts.length}
      onClick={onClick}
    />
  );
};
