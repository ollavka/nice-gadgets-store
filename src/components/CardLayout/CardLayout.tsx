import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AddToFavoriteButton } from '../Buttons/AddToFavoriteButton';
import { Product } from '../../types';
import { AddToCartButton } from '../Buttons/AddToCartButton';
import { normalizeImage } from '../../helpers/normalizeImage';
import styles from './CardLayout.module.scss';

type Props = {
  className?: string;
  item: Product;
};

export const CardLayout: FC<Props> = ({ item, className = '' }) => (
  <article className={cn(styles.card, className)}>
    <Link to={`/${item.category}/${item.itemId}`} className={styles.card__link}>
      <img
        className={styles.card__photo}
        src={normalizeImage(item.image)}
        alt={item.name}
      />
    </Link>

    <Link to={`/${item.category}/${item.itemId}`}>
      <h2 className={styles.card__title}>{item.name}</h2>
    </Link>

    <div className={styles.card__price}>
      <span className={styles.card__price__now}>{`$${item.price}`}</span>
      <span className={styles.card__price__old}>{`$${item.fullPrice}`}</span>
    </div>
    <span className={styles.card__line} />

    <ul className={styles.card__characteristics}>
      <li className={styles.characteristic}>
        <span className={styles.characteristicTitle}>Screen</span>
        <span className={styles.characteristicValue}>{item.screen}</span>
      </li>
      <li className={styles.characteristic}>
        <span className={styles.characteristicTitle}>Capacity</span>
        <span className={styles.characteristicValue}>{item.capacity}</span>
      </li>
      <li className={styles.characteristic}>
        <span className={styles.characteristicTitle}>RAM</span>
        <span className={styles.characteristicValue}>{item.ram}</span>
      </li>
    </ul>
    <div className={styles.card__buttons}>
      <AddToCartButton
        product={item}
        className={styles.buttonCart}
        title={item.name}
      />

      <AddToFavoriteButton className={styles.buttonFavorite} product={item} />
    </div>
  </article>
);
