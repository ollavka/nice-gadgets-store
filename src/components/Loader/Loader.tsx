import { FC } from 'react';
import cn from 'classnames';
import styles from './Loader.module.scss';

type Props = {
  className?: string;
};

export const Loader: FC<Props> = ({ className = '' }) => (
  <div className={cn(styles.loader, className)}>
    <div className={styles.loaderContent} />
  </div>
);
