import { useState, useEffect } from 'react';
import { Breakpoint } from '../types';

export const useBreakpoint = () => {
  const getBreakpoint = (width: number) => {
    if (width >= Breakpoint.Desktop) {
      return Breakpoint.Desktop;
    }

    if (width >= Breakpoint.Tablet) {
      return Breakpoint.Tablet;
    }

    return Breakpoint.Mobile;
  };

  const [breakpoint, setBreakpoint] = useState(
    getBreakpoint(window.innerWidth),
  );

  const handleResize = () => {
    const newBreakpoint = getBreakpoint(window.innerWidth);

    if (newBreakpoint !== breakpoint) {
      setBreakpoint(newBreakpoint);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return breakpoint;
};
