/* eslint-disable import/no-extraneous-dependencies */
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useContext } from 'react';
import styles from './SkeletonHomePage.module.scss';
import { ThemeContext } from '../../../context/ThemeContext';

export const SkeletonHomePage = () => {
  const { theme } = useContext(ThemeContext);

  const darkSkeleton = theme === 'dark' ? '#75767f' : '#ebebeb';

  return (
    <SkeletonTheme baseColor={darkSkeleton}>
      <div className={styles.Skeleton}>
        <div className={styles.SkeletonCarousel}>
          <Skeleton height={400} />
          <Skeleton height={400} />
          <Skeleton height={400} />
        </div>

        <div className={styles.SkeletonSlider}>
          <Skeleton height={4} />
          <Skeleton height={0} />
          <Skeleton height={4} />
          <Skeleton height={0} />
          <Skeleton height={4} />
          <Skeleton height={0} />
          <Skeleton height={4} />
          <Skeleton height={0} />
          <Skeleton height={4} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
