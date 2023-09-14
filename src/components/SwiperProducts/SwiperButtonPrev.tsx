import { useContext, useState } from 'react';
import { useSwiper } from 'swiper/react';
import cn from 'classnames';
import { ThemeContext } from '../../context/ThemeContext';
import { ButtonType } from '../../types';
import { Button } from '../Buttons/Button';
import styles from './SwiperProducts.module.scss';
import btnStyles from '../Buttons/Button/Button.module.scss';

import arrowLeft from '../../assets/icons/black-arrows/arrow-left.svg';
import arrowLeftDisable from '../../assets/icons/gray-arrows/arrow-left.svg';

export const SwiperButtonPrev = () => {
  const swiper = useSwiper();
  const [isDisable, setIsDisable] = useState(swiper.isBeginning);

  swiper.on('activeIndexChange', () => {
    setIsDisable(swiper.isBeginning);
  });

  const goPrev = () => {
    swiper.slidePrev();
  };

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';

  const lightmode = isThemeModeDark ? arrowLeft : arrowLeftDisable;
  const darkmode = isThemeModeDark ? arrowLeftDisable : arrowLeft;

  return (
    <Button
      type={ButtonType.Button}
      className={cn(styles.swiperButton, {
        [btnStyles.disabled]: isDisable,
      })}
      onClick={goPrev}
      iconPath={isDisable ? lightmode : darkmode}
    />
  );
};
