import SummaryPage from '@/summary/SummaryPage';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useAnonymousUser } from 'context/AnonymousContext';

const Summary = (props) => {
  const { status } = useSession();
  const [anonyUser] = useAnonymousUser();
  const [expenses, setExpenses] = useState([]);

  const fetchExpensesAPI = async () => {
    try {
      const res = await fetch('/api/expenses');

      const response = await res.json();
      setExpenses(response);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const fetchExpensesLocal = () => {
    const localExpensesJSON = localStorage.getItem('expenses');

    if (localExpensesJSON) {
      setExpenses(JSON.parse(localExpensesJSON));
    } else {
      setExpenses([]);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchExpensesAPI();
    }

    if (status === 'unauthenticated' && anonyUser) {
      fetchExpensesLocal();
    }
  }, [status, anonyUser]);

  useEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Summary');
    setFilter(true);
  }, []);

  return (
    <>
      <Head>
        <title>Arise | Summary</title>
        <meta name='description' content='The Best Budget Tracking App!' />
        <link rel='shortcut icon' href='public/favicon.ico' />
      </Head>
      <SummaryPage expenses={expenses} />
    </>
  );
};

export default Summary;
