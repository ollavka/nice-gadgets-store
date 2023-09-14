/* eslint-disable */
import { useState, FC, useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Logo } from '../Logo';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { ButtonType, ProductCategory, Breakpoint } from '../../types';
import { FavoriteLink } from '../FavoriteLink';
import { CartLink } from '../CartLink';
import { Button } from '../Buttons/Button';
import styles from './Header.module.scss';
import burger from '../../assets/icons/burger-menu.svg';
import burgerDark from '../../assets/icons-dark/Menu.svg';
import { SearchInput } from '../SearchInput/SearcInput';
import { ThemeContext, themes } from '../../context/ThemeContext';
import Toggle from '../Toggle/Toggle';

export const links = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Phones',
    path: '/phones',
  },
  {
    title: 'Tablets',
    path: '/tablets',
  },
  {
    title: 'Accessories',
    path: '/accessories',
  },
];

export const Header: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const { pathname } = useLocation();

  const [currentPage] = pathname.split('/').filter(Boolean);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(currentPage);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;

    setTheme(newTheme);
  };

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';
  const currentBurger = isThemeModeDark ? burgerDark : burger;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo className={styles.header__logo} />

        <div className={styles.header__content}>
          <nav className={styles.navigation}>
            <ul className={styles.navigation__list}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cn(styles.navigation__link, { [styles.active]: isActive })
                  }
                  onClick={() => setActiveLink('')}
                >
                  home
                </NavLink>
              </li>

              {Object.values(ProductCategory).map((category) => (
                <li key={category}>
                  <NavLink
                    to={category}
                    className={({ isActive }) =>
                      cn(styles.navigation__link, isActive ? styles.active : '')
                    }
                    onClick={() => setActiveLink('')}
                  >
                    {category}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <SearchInput
              className={cn(styles.actionsLink, styles.actionsLinkSearch)}
            />

            <Button
              type={ButtonType.Button}
              className={cn(styles.actionsLink, styles.actionsLinkTheme)}
              onClick={toggleTheme}
            >
              <Toggle onChange={() => {}} value={theme === themes.dark} />
            </Button>

            <FavoriteLink
              className={cn(styles.actionsLink, styles.actionsLinkFav, {
                [styles.active]: activeLink === 'favorites',
              })}
              onClick={() => setActiveLink('favorites')}
            />

            <CartLink
              className={cn(styles.actionsLink, styles.actionsLinkCart, {
                [styles.active]: activeLink === 'cart',
              })}
              onClick={() => setActiveLink('cart')}
            />

            <Button
              type={ButtonType.Button}
              iconPath={currentBurger}
              className={cn(styles.actionsLink, styles.burger)}
              onClick={toggleMenu}
            />
          </div>

          <BurgerMenu
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            activeLink={activeLink}
            onChangeLink={setActiveLink}
          />
        </div>
      </div>
    </header>
  );
};
