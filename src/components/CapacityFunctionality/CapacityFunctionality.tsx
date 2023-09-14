/* eslint-disable max-len */
import { FC } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { ProductDetails } from '../../types';
import styles from './CapacityFunctionality.module.scss';
import btnStyles from '../Buttons/Button/Button.module.scss';

type Props = {
  capacityList: string[];
  redirect: (options: Pick<ProductDetails, 'capacity'>) => string;
};

export const CapacityFunctionality: FC<Props> = ({
  capacityList,
  redirect,
}) => {
  return (
    <div className={styles.capacity}>
      <p>Select capacity</p>

      <ul className={styles.capacity__list}>
        {capacityList.map((capacity) => (
          <li key={capacity}>
            <NavLink
              to={redirect({ capacity })}
              className={({ isActive }) => cn(styles.capacity__list__item, btnStyles.container, {
                [styles.is__active]: isActive,
              })}
            >
              {capacity}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
