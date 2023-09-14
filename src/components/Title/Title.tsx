/* eslint-disable react/require-default-props */
import { FC } from 'react';
import cn from 'classnames';
import styles from './Title.module.scss';

type Props = {
  className?: string;
  value: string;
};

export const Title: FC<Props> = ({ value, className = '' }) => {
  return <h1 className={cn(styles.content, className)}>{value}</h1>;
};
