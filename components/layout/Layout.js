import styles from './Layout.module.css';

import Header from './Header';
import NavMenu from './NavMenu';
import Dropdown from '@/ui/Dropdown';
// import { useTheme } from 'context/ThemeContext';
import { useLayout } from 'context/LayoutContext';
import { useLayoutEffect, useState } from 'react';
import { useSession } from 'context/SessionContext';

function Layout(props) {
  const [localSession, setLocalSession] = useSession();

  useLayoutEffect(() => {
    if (localStorage.getItem('anonymous')) {
      setLocalSession(true);
    }
  }, []);

  // const [darkTheme, toggleTheme] = useTheme();
  const [title, setTitle, sort, setSort] = useLayout();

  const filterOpts = [
    { key: '1', name: 'Today', value: 'today' },
    { key: '2', name: 'Last 7 days', value: 'last-7' },
    { key: '3', name: 'Last 30 days', value: 'last-30' },
    { key: '4', name: 'This Year', value: 'last-y' },
  ];

  const [filter, setFilter] = useState({
    key: '2',
    name: 'Last 7 days',
    value: 'last-7',
  });

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <NavMenu />
        <div className={styles.container}>
          <div className={styles['top-bar']}>
            <h1 className={styles.title}>{title}</h1>
            {sort && (
              <Dropdown
                className={styles.sort}
                state={[filter, setFilter]}
                options={filterOpts}
              />
            )}
          </div>
          {props.children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
