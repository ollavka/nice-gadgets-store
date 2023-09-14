/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { useEffect } from 'react';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { Carousel } from '../../components/Carousel/Carousel';
import { SwiperProducts } from '../../components/SwiperProducts/SwiperdProducts';
import { Categories } from '../../components/Categories';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectProductsStats,
  selectSuggestedProducts,
} from '../../redux/selectors';
import { fecthProductsStats } from '../../redux/slices/productsStatsSlice';
import { fecthSuggestedProducts } from '../../redux/slices/suggestedProductsSlice';
import { SkeletonHomePage } from '../../components/Skeletons/SkeletonHomePage/SkeletonHomePage';
import { ProductsListSkeleton } from '../../components/Skeletons/ProductListSkeleton/ProductListSkeleton';

import container from '../../styles/utils/container.module.scss';
import styles from './HomePage.module.scss';
import notifStyles from '../../styles/utils/notification.module.scss';
import { GoToTopButton } from '../../components/GoToTopButton/GoToTopButton';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const {
    countByGroup,
    loaded: statsLoaded,
    hasError: statsError,
  } = useAppSelector(selectProductsStats);

  const {
    data: { newest, discount },
    loaded: suggestedLoaded,
    hasError: suggestedError,
  } = useAppSelector(selectSuggestedProducts);

  useEffect(() => {
    if (statsLoaded) {
      return;
    }

    dispatch(fecthProductsStats());
  }, [statsLoaded]);

  useEffect(() => {
    if (suggestedLoaded) {
      return;
    }

    dispatch(fecthSuggestedProducts());
  }, [suggestedLoaded]);

  useEffect(() => {
    if (!suggestedError || !statsError) {
      return;
    }

    toast.error('Something went wrong!', {
      bodyClassName: notifStyles.notification,
    });
  }, [suggestedError, statsError]);

  return (
    <div className={styles.HomePage}>
      <div className={cn(container.limit, styles.container)}>
        <h2 className={styles.HomePage__title}>
          Welcome to Nice Gadgets store!
        </h2>

        {!statsLoaded || !suggestedLoaded || statsError || suggestedError ? (
          <>
            <SkeletonHomePage />
            <ProductsListSkeleton className={styles.swiperContainer} />
          </>
        ) : (
          <>
            <Carousel />

            <div className={styles.swiperContainer}>
              <SwiperProducts title="Brand new models" items={newest} />
            </div>

            <Categories countByGroup={countByGroup} />

            <div className={styles.swiperContainer}>
              <SwiperProducts title="Hot prices" items={discount} />
            </div>
          </>
        )}
      </div>
      <GoToTopButton />
    </div>
  );
};
