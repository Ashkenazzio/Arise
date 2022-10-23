import { useEffect, useState, cloneElement } from 'react';
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
          </div>
          {cloneElement(props.children, {
            layout: [setTitle, setFilterElement],
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
