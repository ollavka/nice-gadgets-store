import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper';
import { SwiperButtonNext } from './SwiperButtonNext';
import { SwiperButtonPrev } from './SwiperButtonPrev';
import { CardLayout } from '../CardLayout';
import { Product } from '../../types';
import styles from './SwiperProducts.module.scss';

type Props = {
  title: string;
  items: Product[];
};

export const SwiperProducts: React.FC<Props> = ({ title, items }) => {
  return (
    <section className={styles.swiperContainer}>
      <Swiper
        className={styles.swiperContent}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerGroup={1}
        slidesPerView={1}
        breakpoints={{
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            allowTouchMove: true,
            speed: 400,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1020: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            speed: 700,
            allowTouchMove: false,
          },
        }}
      >
        <div className={styles.swiperHeader}>
          <h2 className={styles.swiperHeader__title}>{title}</h2>
          <div className={styles.swiperHeader__buttons}>
            <SwiperButtonPrev />
            <SwiperButtonNext />
          </div>
        </div>

        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <CardLayout key={item.id} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
