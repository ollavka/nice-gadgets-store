import { Link } from 'react-router-dom';
import { useContext } from 'react';

import logo from '../../assets/icons/logo.svg';
import logoDark from '../../assets/icons-dark/logo-dark.svg';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className = '' }) => {
  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';

  return (
    <Link to="/" className={className}>
      <img src={isThemeModeDark ? logoDark : logo} alt="Nice gadgets" />
    </Link>
  );
};
