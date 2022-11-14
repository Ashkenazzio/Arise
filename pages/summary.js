import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAnonymousUser } from 'context/AnonymousContext';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

import Head from 'next/head';
import SummaryPage from '@/summary/SummaryPage';
import { getDaysAgoData } from 'lib/utilities/dateFilters';
import Prompt from '@/ui/Prompt';

const Summary = (props) => {
  const { status } = useSession();
  const [anonyUser] = useAnonymousUser();
  const [prompt, setPrompt] = useState(props.fetchedError);

  const incomeSummary = props.summary;
  const { fetchedExpenses, fetchedIncomes } = props.queries;
  const [expenses, setExpenses] = useState(fetchedExpenses);
  const [incomes, setIncomes] = useState(fetchedIncomes);

  const fetchQueriesLocal = () => {
    const localExpensesJSON = localStorage.getItem('expenses');
    const localIncomesJSON = localStorage.getItem('incomes');

    if (localExpensesJSON) {
      setExpenses(JSON.parse(localExpensesJSON));
    } else {
      setExpenses([]);
    }

    if (localIncomesJSON) {
      setIncomes(JSON.parse(localIncomesJSON));
    } else {
      setIncomes([]);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated' && anonyUser) {
      fetchQueriesLocal();
    }
  }, [status, anonyUser]);

  useEffect(() => {
    const [setTitle, setFilter, setQueryControl] = props.layout;

    setTitle('Summary');
    setQueryControl(true);
    setFilter(true);
  }, [props.layout]);

  const filterData = (list, filter) => {
    if (filter.id <= 5) {
      return getDaysAgoData(list, filter.value);
    }

    // if (filter >= 5) {
    //   return;
    // }
  };

  const [expenseAgoData, expenseCompareData] = filterData(
    expenses,
    props.filter
  );

  const [incomeAgoData, incomeCompareData] = filterData(incomes, props.filter);

  const closePromptHandler = () => {
    setPrompt({
      res: null,
      ok: null,
      message: '',
    });
  };

  return (
    <>
      <Head>
        <title>Arise | Summary</title>
      </Head>
      <SummaryPage
        queries={
          !incomeSummary
            ? props.filter.id
              ? [expenseAgoData, expenseCompareData]
              : [expenses]
            : props.filter.id
            ? [incomeAgoData, incomeCompareData]
            : [incomes]
        }
        list={incomeSummary ? 'Incomes' : 'Expenses'}
      />
      {prompt.res && (
        <Prompt
          onClose={closePromptHandler}
          ok={prompt.ok}
          message={prompt.message}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  let fetchedExpenses = [];
  let fetchedIncomes = [];
  let fetchedError = {
    res: null,
    ok: null,
    message: '',
  };

  const dev = process.env.NEXTAUTH_URL === 'http://localhost:3000';
  const server = dev
    ? 'http://localhost:3000'
    : 'https://arise-mocha.vercel.app';

  if (session) {
    try {
      const res = await fetch(`${server}/api/expenses`, {
        headers: {
          cookie: req.headers.cookie,
        },
      });
      const parsedResponse = await res.json();

      if (res.ok) {
        fetchedExpenses = parsedResponse;
      } else {
        fetchedError = {
          res: true,
          ok: false,
          message: parsedResponse.message,
        };
      }
    } catch (error) {
      throw Error(error.message);
    }

    try {
      const res = await fetch(`${server}/api/incomes`, {
        headers: {
          cookie: req.headers.cookie,
        },
      });
      const parsedResponse = await res.json();

      if (res.ok) {
        fetchedIncomes = parsedResponse;
      } else {
        fetchedError = {
          res: true,
          ok: false,
          message: parsedResponse.message,
        };
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  return {
    props: {
      queries: { fetchedExpenses, fetchedIncomes },
      fetchedError: fetchedError,
    },
  };
}

export default Summary;
