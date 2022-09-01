import styles from './Layout.module.css';

import Header from './Header';
import NavMenu from './NavMenu';

function Layout(props) {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <NavMenu />
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
