import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import styles from './NavMenu.module.css';
import NavItem from './NavItem';

const NavMenu = () => {
  const { status } = useSession();
  const router = useRouter();

  const logoutHandler = () => {
    router.push('/login');

    setTimeout(() => {
      if (status === 'authenticated') {
        signOut();
      }
      localStorage.setItem('arise-anonymous', false);
    }, 5);
  };

  return (
    <aside className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles['nav-routes']}>
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
        </ul>
        <ul className={styles['nav-actions']}>
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
        </ul>
      </nav>
    </aside>
  );
};

export default NavMenu;
