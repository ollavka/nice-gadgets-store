import { useContext, useState } from 'react';
import cn from 'classnames';
import { useSwiper } from 'swiper/react';
import { ButtonType } from '../../types';
import { Button } from '../Buttons/Button';
import styles from './SwiperProducts.module.scss';
import btnStyles from '../Buttons/Button/Button.module.scss';

import arrowRight from '../../assets/icons/black-arrows/arrow-right.svg';
import arrowRightDisable from '../../assets/icons/gray-arrows/arrow-right.svg';
import { ThemeContext } from '../../context/ThemeContext';

export const SwiperButtonNext = () => {
  const swiper = useSwiper();
  const [isDisable, setIsDisable] = useState(false);

  swiper.on('activeIndexChange', () => {
    setIsDisable(swiper.isEnd);
  });

  const goNext = () => {
    swiper.slideNext();
  };

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';

  const lightmode = isThemeModeDark ? arrowRight : arrowRightDisable;
  const darkmode = isThemeModeDark ? arrowRightDisable : arrowRight;

  return (
    <Button
      type={ButtonType.Button}
      className={cn(styles.swiperButton, {
        [btnStyles.disabled]: isDisable,
      })}
      onClick={goNext}
      iconPath={isDisable ? lightmode : darkmode}
    />
  );
};
