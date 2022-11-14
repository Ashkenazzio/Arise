import { useEffect, useState, Children, cloneElement } from 'react';
import { useTheme } from 'context/ThemeContext';
import { useCurrency } from 'context/CurrencyContext';
import { useAnonymousUser } from 'context/AnonymousContext';
import { useSession } from 'next-auth/react';
import { Router, useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './Layout.module.css';
import Header from './Header';
import NavMenu from './NavMenu';
import Dropdown from '@/ui/Dropdown';
import QueryFilter from './QueryFilter';
import { mainContainerVars } from 'lib/framer-variants';
import Loader from '@/ui/Loader';

function Layout(props) {
  const [anonyUser, setAnonyUser] = useAnonymousUser();
  const { status } = useSession();
  const { darkTheme, setDarkTheme } = useTheme();
  const [currency, setCurrency] = useCurrency();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [filterElement, setFilterElement] = useState(false);
  const [queryControl, setQueryControl] = useState(false);
  const [incomeSummary, setIncomeSummary] = useState(false);

  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });

  useEffect(() => {
    const anonymous = localStorage.getItem('arise-anonymous');
    if (anonymous == 'true') {
      setAnonyUser(true);
    }
  }, [setAnonyUser]);

  useEffect(() => {
    if (status === 'unauthenticated' && !anonyUser) {
      router.push('/login');
    }
  }, [status, anonyUser, router]);

  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem('preferences'));

    if (preferences) {
      setDarkTheme(preferences.darkTheme);
      setCurrency(preferences.currency);
    }
  }, [setCurrency, setDarkTheme]);

  useEffect(() => {
    document.body.setAttribute('dark-theme', darkTheme);
  }, [darkTheme]);

  // const now = new Date();
  // const thisMonth = now.getUTCMonth();
  // const thisYear = now.getUTCFullYear();
  // const lastFiveYear = now => now.getUTCFullYear()

  const filterOpts = [
    { id: 0, name: 'All', value: null },
    { id: 1, name: 'Today', value: 0 },
    { id: 2, name: 'Last 7 days', value: 6 },
    { id: 3, name: 'Last 30 days', value: 29 },
    { id: 4, name: 'Last 90 days', value: 89 },
    // { id: 5, name: 'This Month', value: thisMonth },
    // { id: 6, name: 'This Year', value: thisYear },
    // { id: 7, name: 'Last 5 Years', value: thisYear },
  ];

  const [filter, setFilter] = useState({ id: 0, name: 'All', value: null });

  return (
    <div className={styles.app}>
      <Header />
      <AnimatePresence>
        <motion.main
          variants={mainContainerVars}
          initial='hidden'
          animate='enter'
          exit='hidden'
          className={styles.main}
        >
          <NavMenu />
          <section className={styles.container}>
            <header className={styles['top-bar']}>
              <h1 className={styles.title}>{title}</h1>
              <div className={styles.controls}>
                {queryControl && (
                  <QueryFilter summary={[incomeSummary, setIncomeSummary]} />
                )}
                {filterElement && (
                  <Dropdown
                    className={styles.dropdown}
                    state={[filter, setFilter]}
                    options={filterOpts}
                  />
                )}
              </div>
            </header>
            {loading && <Loader />}
            {!loading &&
              Children.map(props.children, (child) => {
                return cloneElement(child, {
                  layout: [setTitle, setFilterElement, setQueryControl],
                  filter: filter,
                  control: queryControl,
                  summary: incomeSummary,
                });
              })}
          </section>
        </motion.main>
      </AnimatePresence>
      <footer className={styles.credit}>
        Designed and developed by{' '}
        <a
          href='https://ashkenazzio.github.io'
          target='_blank'
          className={`${styles.link} icon-before`}
        >
          Omri Ashkenazi
        </a>
      </footer>
    </div>
  );
}

export default Layout;
