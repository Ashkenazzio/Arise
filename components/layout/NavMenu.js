import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import styles from './NavMenu.module.css';
import NavItem from './NavItem';
import Link from 'next/link';

const NavMenu = () => {
  const { status } = useSession();
  const router = useRouter();

  const logoutHandler = () => {
    router.push('/login');

    if (status === 'authenticated') {
      signOut();
    }
    localStorage.setItem('arise-anonymous', false);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.nav}>
        <div className={styles['nav-routes']}>
          <NavItem
            href='/start'
            title='Get Started'
            icon={String.fromCharCode(0xf05a)}
          />
          <NavItem href='/add' title='Add' icon={String.fromCharCode(0xf0ca)} />
          <NavItem
            href='/flow'
            title='Flow'
            icon={String.fromCharCode(0xf24e)}
          />
          <NavItem
            href='/summary'
            title='Summary'
            icon={String.fromCharCode(0xf200)}
          />
        </div>
        <div className={styles['nav-actions']}>
          <NavItem
            href='/settings'
            title='Settings'
            icon={String.fromCharCode(0xf013)}
          />
          <NavItem
            onClick={logoutHandler}
            title='Logout'
            icon={String.fromCharCode(0xf2f5)}
          />
        </div>
      </ul>
      <footer className={styles.credit}>
        Designed and developed by{' '}
        <Link href={'https://ashkenazzio.github.io'}>
          <span className={styles.link}>Omri Ashkenazi </span>
        </Link>
      </footer>
    </div>
  );
};

export default NavMenu;
