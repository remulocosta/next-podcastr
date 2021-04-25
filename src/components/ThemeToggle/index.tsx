import React from 'react';
import { useTheme } from 'next-themes';

import styles from './toggle.module.scss';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  function handleSetTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <button className={styles.btnToggle} type="button" onClick={handleSetTheme}>
      <span
        className={
          theme === 'light' ? styles.toggleThumbDark : styles.toggleThumbLight
        }
      />
      <span>🌙</span>
      <span>☀️</span>
    </button>
  );
};

export default ThemeToggle;
