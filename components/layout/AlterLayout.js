import { useTheme } from 'context/ThemeContext';
import { useEffect } from 'react';

import styles from './Layout.module.css';
import Image from 'next/image';
import logo from '@/images/logo.svg';

function AlterLayout(props) {
  const { darkTheme, setDarkTheme } = useTheme();

  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem('preferences'));

    if (preferences) {
      setDarkTheme(preferences.darkTheme);
    }
  }, [setDarkTheme]);

  useEffect(() => {
    document.body.setAttribute('dark-theme', darkTheme);
  }, [darkTheme]);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Image className={styles.logo} src={logo} alt='logo' />
      </div>
      {props.children}
    </div>
  );
}

export default AlterLayout;
