import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Modal } from './Modal';
import { CartCardLayout } from '../../components/CartCardLayout';
import { useAppSelector } from '../../redux/hooks';
import { selectCart } from '../../redux/selectors';
import container from '../../styles/utils/container.module.scss';
import styles from './Cart.module.scss';
import arrowLeft from '../../assets/icons/black-arrows/arrow-left.svg';
import { Button } from '../../components/Buttons/Button';
import { ButtonType } from '../../types';

export const Cart: FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { items, totalCount, totalPrice } = useAppSelector(selectCart);

  const onHandleClick = () => {
    setIsModalOpened(true);
  };

  return (
    <>
      {isModalOpened && <Modal />}

      <div className={`${container.limit} ${styles.Container}`}>
        <p className={styles.Container__Top}>
          <Link to="/" className={styles.BackLink}>
            <img src={arrowLeft} alt="Back" />
            Back
          </Link>
        </p>

        <h1 className={styles.title}>Cart</h1>

        {!totalCount ? (
          <h2 className={styles.emptyCart}>
            There are no items in your cart 🧐
          </h2>
        ) : (
          <div className={styles.Container__Content}>
            <ul className={styles.ItemContainer}>
              {Object.values(items).map(({ item, count }) => (
                <li className={styles.ItemContainer__CartItem} key={item.id}>
                  <CartCardLayout product={item} count={count} />
                </li>
              ))}
            </ul>

            <div className={styles.TotalContainer}>
              <div className={styles.TotalContainer__Price}>
                <h2 className={styles.TotalContainer__Price__Amount}>
                  {`$${totalPrice}`}
                </h2>
                <p className={styles.TotalContainer__Price__Title}>
                  {`Total for ${totalCount} items`}
                </p>
              </div>

              <Button
                type={ButtonType.Button}
                className={cn(styles.TotalContainer__Button)}
                onClick={onHandleClick}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
