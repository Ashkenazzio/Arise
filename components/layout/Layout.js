import { useEffect, useState, Children, cloneElement } from 'react';
import { useTheme } from 'context/ThemeContext';
import { useCurrency } from 'context/CurrencyContext';
import { useAnonymousUser } from 'context/AnonymousContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import styles from './Layout.module.css';
import Header from './Header';
import NavMenu from './NavMenu';
import Dropdown from '@/ui/Dropdown';

function Layout(props) {
  const [anonyUser, setAnonyUser] = useAnonymousUser();
  const { status } = useSession();
  const { darkTheme, setDarkTheme } = useTheme();
  const [currency, setCurrency] = useCurrency();
  const router = useRouter();

  useEffect(() => {
    const anonymous = localStorage.getItem('arise-anonymous');
    if (anonymous == 'true') {
      setAnonyUser(true);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated' && !anonyUser) {
      router.push('/login');
    }
  }, [status, anonyUser]);

  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem('preferences'));

    if (preferences) {
      setDarkTheme(preferences.darkTheme);
      setCurrency(preferences.currency);
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute('dark-theme', darkTheme);
  }, [darkTheme]);

  const [title, setTitle] = useState('');
  const [filterElement, setFilterElement] = useState(false);

  const now = new Date();
  const thisMonth = now.getUTCMonth();
  const thisYear = now.getUTCFullYear();
  // const lastFiveYear = now => now.getUTCFullYear()

  const filterOpts = [
    { id: 1, name: 'All', value: 0 },
    { id: 2, name: 'Today', value: 0 },
    { id: 3, name: 'Last 7 days', value: 6 },
    { id: 4, name: 'Last 30 days', value: 29 },
    { id: 5, name: 'Last 90 days', value: 89 },
    { id: 6, name: 'This Month', value: thisMonth },
    { id: 7, name: 'This Year', value: thisYear },
    // { id: 8, name: 'Last 5 Years', value: thisYear },
  ];

  const [filter, setFilter] = useState({
    id: 2,
    name: 'Last 7 days',
    value: 6,
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
          {Children.map(props.children, (child) => {
            return cloneElement(child, {
              layout: [setTitle, setFilterElement],
              filter: filter,
            });
          })}
        </div>
      </main>
      <p className={styles.credit}>
        &copy; Designed and developed by Omri Ashkenazi
      </p>
    </div>
  );
}

export default Layout;
