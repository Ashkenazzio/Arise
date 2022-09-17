import styles from './NavMenu.module.css';

import NavItem from './NavItem';

const NavMenu = () => {
  return (
    <ul className={styles.nav}>
      <div className={styles['nav-routes']}>
        <NavItem
          href='/'
          title='Get Started'
          icon={String.fromCharCode(0xf05a)}
        />

        <NavItem href='/add' title='Add' icon={String.fromCharCode(0xf0ca)} />

        <NavItem href='/flow' title='Flow' icon={String.fromCharCode(0xf24e)} />

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
          href='/logout'
          title='Logout'
          icon={String.fromCharCode(0xf2f5)}
        />
      </div>
    </ul>
  );
};

export default NavMenu;
