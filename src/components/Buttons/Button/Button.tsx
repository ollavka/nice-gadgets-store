/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import { FC, ReactNode } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { ButtonType, SearchParams } from '../../../types';
import { SearchLink } from '../../SearchLink';
import styles from './Button.module.scss';

type CommonProps = {
  className?: string;
  iconPath?: string;
  onClick?: () => void;
  children?: ReactNode;
  badge?: number;
};

type SearchLinkProps = {
  type: ButtonType.Search;
  params: SearchParams;
};

type LinkProps = {
  type: ButtonType.Link;
  to: string;
};

type ButtonProps = {
  type: ButtonType.Button;
};

type Props = CommonProps & (ButtonProps | SearchLinkProps | LinkProps);

export const Button: FC<Props> = (props) => {
  const {
    type,
    className = '',
    onClick = () => {},
    iconPath = '',
    children,
    badge = 0,
  } = props;

  const buttonClassnames = cn(className, styles.container);

  const commonProps = {
    className: buttonClassnames,
    onClick,
  };

  const componentChildren = (
    <div className={styles.content}>
      {iconPath ? <img src={props.iconPath} alt="icon" /> : children}

      {badge > 0 && (
        <span className={styles.badge}>{badge <= 99 ? badge : '99+'}</span>
      )}
    </div>
  );

  if (type === ButtonType.Search) {
    return (
      <SearchLink params={props.params} {...commonProps}>
        {componentChildren}
      </SearchLink>
    );
  }

  if (type === ButtonType.Link) {
    return (
      <NavLink to={props.to} {...commonProps}>
        {componentChildren}
      </NavLink>
    );
  }

  return (
    <button type="button" {...commonProps}>
      {componentChildren}
    </button>
  );
};
