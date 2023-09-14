/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useContext } from 'react';
import styles from './SkeletonProductPage.module.scss';
import { ThemeContext } from '../../../context/ThemeContext';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { Breakpoint } from '../../../types';

const MOBILE_IMAGE_WIDTH = 210;
const DESKTOP_IMAGE_WIDTH = 340;
const MOBILE_IMAGE_HEIGHT = 300;
const DESKTOP_IMAGE_HEIGHT = 420;

export const SkeletonProductPage = () => {
  const { theme } = useContext(ThemeContext);
  const breakpoint = useBreakpoint();

  const darkSkeleton = theme === 'dark' ? '#75767f' : '#ebebeb';

  const [imageWidth, imageHeight]
    = breakpoint !== Breakpoint.Desktop
      ? [MOBILE_IMAGE_WIDTH, MOBILE_IMAGE_HEIGHT]
      : [DESKTOP_IMAGE_WIDTH, DESKTOP_IMAGE_HEIGHT];

  return (
    <SkeletonTheme baseColor={darkSkeleton}>
      <div className={styles.Skeleton}>
        <div className={styles.Skeleton__Title}>
          <Skeleton height={35} width="90%" />
        </div>

        <div className={styles.Skeleton__Item}>
          <div className={styles.Skeleton__ImagesContainer}>
            <div className={styles.Skeleton__Image}>
              <Skeleton height={imageHeight} width={imageWidth} />
            </div>

            <div className={styles.Skeleton__Images}>
              <Skeleton height={50} width={50} />
              <Skeleton height={50} width={50} />
              <Skeleton height={50} width={50} />
            </div>
          </div>

          <div className={styles.Skeleton__ItemDetails}>
            <div className={styles.Skeleton__Colors}>
              <Skeleton height={10} width="70%" />
              <div className={styles.Skeleton__Colors__circles}>
                <Skeleton
                  height={35}
                  width={35}
                  className={styles.Skeleton__Colors__circle}
                />
                <Skeleton
                  height={35}
                  width={35}
                  className={styles.Skeleton__Colors__circle}
                />
                <Skeleton
                  height={35}
                  width={35}
                  className={styles.Skeleton__Colors__circle}
                />
                <Skeleton
                  height={35}
                  width={35}
                  className={styles.Skeleton__Colors__circle}
                />
              </div>
              <Skeleton height={1} width="100%" />
            </div>

            <div className={styles.Skeleton__Capacity}>
              <Skeleton height={10} width="70%" />
              <div className={styles.Skeleton__Capacity__rectangles}>
                <Skeleton height={25} width={55} />
                <Skeleton height={25} width={55} />
                <Skeleton height={25} width={55} />
              </div>
              <Skeleton height={1} width="100%" />
            </div>

            <div className={styles.Skeleton__Price}>
              <Skeleton height={30} width="30%" />
            </div>

            <div className={styles.Skeleton__Info}>
              <Skeleton height={100} width="100%" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
