/* eslint-disable max-len */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { scrollToTop } from '../../helpers/scrollToTop';
import { Button } from '../Buttons/Button';
import { ThemeContext } from '../../context/ThemeContext';
import { ButtonType } from '../../types';

import styles from './GoToTopButton.module.scss';
import arrow_up from '../../assets/icons/black-arrows/arrow-up.svg';
import arrow_up_gray from '../../assets/icons/gray-arrows/arrow-up.svg';

export const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollThreshold = 100;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      const documentHeight = document.documentElement.scrollHeight;

      const footerHeight = 100;
      const isFooterVisible
        = scrollY + window.innerHeight < documentHeight - footerHeight;

      setShowButton(scrollY > scrollThreshold && isFooterVisible);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';
  const button = isThemeModeDark ? arrow_up_gray : arrow_up;

  return (
    <div
      role="button"
      className={cn(styles.Button, {
        [styles.show]: showButton,
      })}
      onClick={scrollToTop}
    >
      <Button
        type={ButtonType.Button}
        iconPath={button}
        className={styles.Button__arrow}
      />
    </div>
  );
};
