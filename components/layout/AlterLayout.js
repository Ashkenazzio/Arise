import { useTheme } from 'context/ThemeContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Router } from 'next/router';

import styles from './Layout.module.css';
import Image from 'next/image';
import logo from '@/images/logo.svg';
import Loader from '@/ui/Loader';

function AlterLayout(props) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });

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
    <AnimatePresence>
      <motion.div
        initial='hidden'
        animate='enter'
        exit='hidden'
        className={styles.app}
      >
        <header className={styles.header}>
          <Image className={styles.logo} src={logo} alt='logo' />
        </header>
        <div className={styles['alt-container']}>
          {loading && <Loader />}
          {!loading && props.children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AlterLayout;
