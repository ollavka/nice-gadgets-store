/* eslint-disable react/require-default-props */
import { FC } from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  className?: string;
};

export const SearchLink: FC<Props> = (props) => {
  const {
    children, params, className = '', ...restProps
  } = props;

  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, params),
      }}
      className={className}
      {...restProps}
    >
      {children}
    </Link>
  );
};
