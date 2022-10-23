import styles from './Layout.module.css';
import { useTheme } from 'context/ThemeContext';
import { useEffect } from 'react';
import Link from 'next/link';

import logo from '@/images/logo.svg';
import { useSession } from 'next-auth/react';

function AlterLayout(props) {
  const { darkTheme } = useTheme();

  useEffect(() => {
    document.body.setAttribute('dark-theme', darkTheme);
  }, [darkTheme]);


  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Link href={'/'}>
          <img className={styles.logo} src={logo.src} alt='logo' />
        </Link>
      </div>

      {props.children}
    </div>
  );
}

export default AlterLayout;
