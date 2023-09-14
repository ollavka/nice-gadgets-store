import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './Modal.module.scss';

type Props = {
  closeModal: () => void;
  title?: string;
};

export const Modal: FC<Props> = ({ closeModal, title }) => {
  useEffect(() => {
    const closeTimeout = setTimeout(() => {
      closeModal();
    }, 4000);

    return () => {
      clearTimeout(closeTimeout);
    };
  }, []);

  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <p className={styles.modal__title__name}>{title}</p>
          <p>has been added to the cart</p>
        </div>

        <Link to="/cart">
          <button type="button" className={styles.modal__button}>
            Go to cart
          </button>
        </Link>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
