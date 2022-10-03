import styles from './Layout.module.css';

import Header from './Header';
import NavMenu from './NavMenu';
import Dropdown from '@/ui/Dropdown';
import React, { useLayoutEffect, useState } from 'react';
import { useAnonymousUser } from 'context/AnonymousContext';
import { useTheme } from 'context/ThemeContext';

function Layout(props) {
  const [anonyUser, setAnonyUser] = useAnonymousUser();

  useLayoutEffect(() => {
    if (localStorage.getItem('anonymous')) {
      setAnonyUser(true);
    }
  }, []);

  const [darkTheme] = useTheme();

  useLayoutEffect(() => {
    document.body.setAttribute('dark-theme', darkTheme);
  }, [darkTheme]);

  const [title, setTitle] = useState('');
  const [filterElement, setFilterElement] = useState(false);

  const filterOpts = [
    { id: '1', name: 'Today', value: 'today' },
    { id: '2', name: 'Last 7 days', value: 'last-7' },
    { id: '3', name: 'Last 30 days', value: 'last-30' },
    { id: '4', name: 'This Year', value: 'last-y' },
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
            {filterElement && !anonyUser && (
              <Dropdown
                className={styles.dropdown}
                state={[filter, setFilter]}
                options={filterOpts}
              />
            )}
          </div>
          {React.cloneElement(props.children, {
            layout: [setTitle, setFilterElement],
          })}
        </div>
      </main>
      {/* <p className={styles.copyrights}>&copy; Omri Ashkenazi </p> */}
    </div>
  );
}

export default Layout;
