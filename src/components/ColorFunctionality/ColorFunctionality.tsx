/* eslint-disable max-len */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Color, ColorKey, ProductDetails } from '../../types';
import styles from './ColorFunctionality.module.scss';

type Props = {
  colors: ColorKey[];
  redirect: (options: Pick<ProductDetails, 'color'>) => string;
};

export const ColorFunctionality: FC<Props> = ({ colors, redirect }) => {
  return (
    <div className={styles.color}>
      <p>Avaliable colors</p>

      <ul className={styles.color__list}>
        {colors.map((color) => (
          <li key={color}>
            <NavLink
              to={redirect({ color })}
              className={({ isActive }) => cn(styles.color__list__item, {
                [styles.is__active]: isActive,
              })}
            >
              <div
                className={styles.color__inner}
                style={{ backgroundColor: Color[color] }}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
