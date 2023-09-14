/* eslint-disable max-len */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useContext } from 'react';
import { Logo } from '../Logo/Logo';
import { scrollToTop } from '../../helpers/scrollToTop';
import { Button } from '../Buttons/Button';
import { ButtonType } from '../../types';

import styles from './Footer.module.scss';
import container from '../../styles/utils/container.module.scss';
import arrow_up from '../../assets/icons/black-arrows/arrow-up.svg';
import arrow_up_dark from '../../assets/icons/gray-arrows/arrow-up.svg';
import { ThemeContext } from '../../context/ThemeContext';

const footerLinks = [
  {
    title: 'Github',
    path: 'https://github.com/fe-may23-codebender/product_catalog_fe',
  },
  { title: 'Contacts', path: '/' },
  { title: 'Rights', path: '/' },
];

export const Footer = () => {
  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';
  const iconMode = isThemeModeDark ? arrow_up_dark : arrow_up;

  return (
    <footer className={styles.footer}>
      <div className={cn(styles.container, container.limit)}>
        <div className={styles.footer__logo}>
          <Logo />
        </div>

        <div className={styles.footer__nav}>
          <ul className={styles.footer__nav__list}>
            {footerLinks.map((link) => (
              <li key={link.title} className={styles.footer__nav__item}>
                <NavLink
                  to={link.path}
                  target="_blank"
                  className={styles.footer__nav__link}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div
          role="button"
          className={styles.footer__button}
          onClick={scrollToTop}
        >
          <span className={styles.footer__button__text}>Back to top</span>
          <Button
            type={ButtonType.Button}
            iconPath={iconMode}
            className={cn(
              styles.footer__button__arrow,
              styles.footer__button__arrow__up,
            )}
          />
        </div>
      </div>
    </footer>
  );
};
