import { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import cn from 'classnames';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Breakpoint, ButtonType } from '../../types';
import { Button } from '../Buttons/Button';

import 'swiper/swiper-bundle.min.css';
import styles from './Carousel.module.scss';

import arrowLeft from '../../assets/icons/black-arrows/arrow-left.svg';
import arrowRight from '../../assets/icons/black-arrows/arrow-right.svg';
import arrowLeftDark from '../../assets/icons/gray-arrows/arrow-left.svg';
import arrowRightDark from '../../assets/icons/gray-arrows/arrow-right.svg';

import Banner1 from '../../assets/banners/banner-phones-new.png';
import Banner2 from '../../assets/banners/banner-phones.png';
import Banner3 from '../../assets/banners/banner-tablets.png';
import Banner4 from '../../assets/banners/banner-accessories.png';
import BannerIphoneBig from '../../assets/banners/banner-iphone14.png';
import BannerIphoneSmall from '../../assets/banners/banner-iphone14-small.png';
import { ThemeContext } from '../../context/ThemeContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let swiperInstance: any = null;

const banners = [Banner1, Banner2, Banner3, Banner4];

export const Carousel = () => {
  const breakpoint = useBreakpoint();

  const goNext: () => void = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const goPrev: () => void = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const banerIphone
    = breakpoint === Breakpoint.Mobile ? BannerIphoneSmall : BannerIphoneBig;

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';

  const currentArrowLeft = isThemeModeDark ? arrowLeftDark : arrowLeft;
  const currentArrowRight = isThemeModeDark ? arrowRightDark : arrowRight;

  return (
    <div className={styles.carousel}>
      <Button
        type={ButtonType.Button}
        className={styles.carousel__btn}
        onClick={goPrev}
        iconPath={currentArrowLeft}
      />

      <Swiper
        className={styles.content}
        wrapperClass={styles.wrapper}
        onSwiper={(swiper) => {
          swiperInstance = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: `.${styles.pagination}`,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        speed={600}
        breakpoints={{
          [Breakpoint.Mobile]: {
            allowTouchMove: true,
          },
          [Breakpoint.Desktop]: {
            allowTouchMove: false,
          },
        }}
      >
        <SwiperSlide className={cn(styles.slide, styles.nextBtn)}>
          <img className={styles.slide__img} src={banerIphone} alt="baner 1" />
        </SwiperSlide>

        {banners.map((banner) => (
          <SwiperSlide key={banner} className={styles.slide}>
            <img className={styles.slide__img} src={banner} alt="baner 1" />
          </SwiperSlide>
        ))}

        <div className={styles.pagination} />
      </Swiper>

      <Button
        type={ButtonType.Button}
        className={cn(styles.carousel__btn, styles.prevBtn)}
        onClick={goNext}
        iconPath={currentArrowRight}
      />
    </div>
  );
};
