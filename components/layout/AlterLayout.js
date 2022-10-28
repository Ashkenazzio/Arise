import { useTheme } from 'context/ThemeContext';
import { useEffect } from 'react';

import styles from './Layout.module.css';
import logo from '@/images/logo.svg';

function AlterLayout(props) {
  const { darkTheme, setDarkTheme } = useTheme();

  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem('preferences'));

    if (preferences) {
      setDarkTheme(preferences.darkTheme);
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute('dark-theme', darkTheme);
  }, [darkTheme]);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <img className={styles.logo} src={logo.src} alt='logo' />
      </div>
      {props.children}
    </div>
  );
}

export default AlterLayout;
