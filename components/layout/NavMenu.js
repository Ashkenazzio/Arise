import Link from 'next/link';
import styles from './NavMenu.module.css';

import NavItem from './NavItem';
import LogoutItem from './LogoutItem';

const NavMenu = () => {
  // const pushDown = { marginTop: 'auto' };

  return (
    <ul className={styles.nav}>
      <div className={styles['nav-routes']}>
        <Link href='/'>
          <a>
            <NavItem icon={String.fromCharCode(0xf05a)}>Get Started</NavItem>
          </a>
        </Link>
        <Link href='/add'>
          <a>
            <NavItem icon={String.fromCharCode(0xf0ca)}>Add Entries</NavItem>
          </a>
        </Link>
        <Link href='/flow'>
          <a>
            <NavItem icon={String.fromCharCode(0xf24e)}>Flow</NavItem>
          </a>
        </Link>
        <Link href='/summary'>
          <a>
            <NavItem icon={String.fromCharCode(0xf200)}>Summary</NavItem>
          </a>
        </Link>
      </div>
      <div className={styles['nav-actions']}>
        <Link href='/settings'>
          <a>
            <NavItem icon={String.fromCharCode(0xf013)}>Settings</NavItem>
          </a>
        </Link>
        <LogoutItem icon={String.fromCharCode(0xf2f5)}>Logout</LogoutItem>
      </div>
    </ul>
  );
};

export default NavMenu;
