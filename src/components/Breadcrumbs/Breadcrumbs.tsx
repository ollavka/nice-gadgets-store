import { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import {
  capitalizeLetter,
  formatProductName,
} from '../../helpers/breadcrumbsHelper';
import styles from './Breadcrumbs.module.scss';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  className?: string;
};

export const Breadcrumbs: FC<Props> = ({ className = '' }) => {
  const location = useLocation();
  const path = location.pathname.split('/');

  const pagePath = path[1];
  const pageName = capitalizeLetter(pagePath) + pagePath.slice(1);
  const pageLink = `/${pageName.toLowerCase()}`;

  let productPath;
  let productName;

  if (path.length > 2) {
    productPath = path[2].split('-');

    productName = formatProductName(productPath);
  }

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';
  const iconHome = isThemeModeDark
    ? styles.breadcrumbs__icon__home__dark
    : styles.breadcrumbs__icon__home;

  return (
    <div className={cn(styles.breadcrumbs, className)}>
      <Link to="/" className={`${styles.breadcrumbs__icon} ${iconHome}`} />

      <div
        className={`${styles.breadcrumbs__icon} ${styles.breadcrumbs__icon__arrow}`}
      />

      <Link to={pageLink} className={styles.breadcrumbs__link}>
        {pageName}
      </Link>

      {path.length > 2 && (
        <>
          <div
            className={`${styles.breadcrumbs__icon} ${styles.breadcrumbs__icon__arrow} `}
          />
          <div>{productName}</div>
        </>
      )}
    </div>
  );
};
