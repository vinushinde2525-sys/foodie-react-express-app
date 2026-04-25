import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from '../store/uiSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  // Sync with DOM on mount and theme change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return { theme, toggleTheme: () => dispatch(toggleTheme()), isDark: theme === 'dark' };
};
