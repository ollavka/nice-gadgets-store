/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from '../../assets/images/404.svg';
import styles from './NotFoundPage.module.scss';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.Container}>
      <img src={NotFoundImg} alt="Not Found" className="" />
      <p className={styles.Container__Text}>
        Sorry, that page doesn&apos;t seem to exist.
      </p>
      <div className={styles.Container__Button}>
        <Link to="/">Start shopping</Link>
      </div>
    </div>
  );
};
