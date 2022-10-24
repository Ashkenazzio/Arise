import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAnonymousUser } from 'context/AnonymousContext';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

import Head from 'next/head';
import SummaryPage from '@/summary/SummaryPage';
import { getDaysAgoData } from 'lib/dateFilters';

const Summary = (props) => {
  const { status } = useSession();
  const [anonyUser] = useAnonymousUser();
  const { fetchedExpenses, fetchedIncomes } = props.queries;

  const [expenses, setExpenses] = useState(fetchedExpenses);
  // const [incomes, setIncomes] = useState(fetchedIncomes);

  const fetchExpensesLocal = () => {
    const localExpensesJSON = localStorage.getItem('expenses');

    if (localExpensesJSON) {
      setExpenses(JSON.parse(localExpensesJSON));
    } else {
      setExpenses([]);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated' && anonyUser) {
      fetchExpensesLocal();
    }
  }, [status, anonyUser]);

  useEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Summary');
    setFilter(true);
  }, []);

  const filterData = (filter, list) => {
    if (filter.id <= 5) {
      return getDaysAgoData(list, filter.value);
    }

    // if (filter >= 5) {
    //   return;
    // }
  };

  const [expenseAgoData, expenseCompareData] = filterData(
    props.filter,
    expenses
  );
  // const [incomeAgoData, incomeCompareData] = filterData(props.filter, incomes);

  return (
    <>
      <Head>
        <title>Arise | Summary</title>
      </Head>
      <SummaryPage
        expenses={[expenseAgoData, expenseCompareData]}
        // incomes={[incomeAgoData, incomeCompareData]}
      />
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  let fetchedExpenses = [];
  let fetchedIncomes = [];

  if (session) {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/expenses`, {
        headers: {
          cookie: req.headers.cookie,
        },
      });
      fetchedExpenses = await res.json();
    } catch (error) {
      throw new Error(error.message);
    }

    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/incomes`, {
        headers: {
          cookie: req.headers.cookie,
        },
      });

      fetchedIncomes = await res.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    props: {
      queries: { fetchedExpenses, fetchedIncomes },
    },
  };
}

export default Summary;
