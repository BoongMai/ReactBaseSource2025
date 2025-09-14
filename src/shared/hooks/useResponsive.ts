import { useEffect, useState } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const useResponsive = (): ResponsiveState => {
  const [responsive, setResponsive] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    const updateResponsive = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setResponsive({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        screenHeight: height,
      });
    };

    // Initial check
    updateResponsive();

    // Listen for resize events
    window.addEventListener('resize', updateResponsive);

    return () => {
      window.removeEventListener('resize', updateResponsive);
    };
  }, []);

  return responsive;
};
