/* eslint-disable react/require-default-props */
import { FC } from 'react';
import { Title } from '../Title';

type Props = {
  category: string;
  className?: string;
};

export const NoResults: FC<Props> = ({ className = '', category }) => (
  <Title className={className} value={`${category} not found 🧐`} />
);
