/* eslint-disable react/require-default-props */
import { FC, useContext } from 'react';
import { ButtonType } from '../../types';
import { Button } from '../Buttons/Button';
import { useAppSelector } from '../../redux/hooks';
import { selectCart } from '../../redux/selectors';

import basket from '../../assets/icons/shopping-bag.svg';
import basketDark from '../../assets/icons-dark/cart.svg';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  className?: string;
  onClick?: () => void;
};

export const CartLink: FC<Props> = ({ className = '', onClick = () => {} }) => {
  const { totalCount } = useAppSelector(selectCart);
  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';

  return (
    <Button
      type={ButtonType.Link}
      to="cart"
      iconPath={isThemeModeDark ? basketDark : basket}
      className={className}
      badge={totalCount}
      onClick={onClick}
    />
  );
};
