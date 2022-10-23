import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAnonymousUser } from 'context/AnonymousContext';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

import FlowLists from '@/flow/FlowLists';

const Flow = (props) => {
  const { status } = useSession();
  const [anonyUser] = useAnonymousUser();
  const { fetchedExpenses, fetchedIncomes } = props.queries;

  const [expenses, setExpenses] = useState(fetchedExpenses);
  const [incomes, setIncomes] = useState(fetchedIncomes);

  // console.log('queries', { expenses, incomes });

  const fetchEntriesLocal = () => {
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
      fetchEntriesLocal();
    }
  }, [status, anonyUser]);

  const addCategoryAPI = (enteredCategory, list) => {
    let url = `/api/${list}`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ title: enteredCategory.value, userId: userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const addCategoryLocal = (enteredCategory, list) => {
    if (list === 'expenses') {
      localStorage.setItem(
        'expense-categories',
        JSON.stringify([
          ...expenseCategories,
          { id: Date.now(), title: enteredCategory.value },
        ])
      );

      setExpenseCategories(
        JSON.parse(localStorage.getItem('expense-categories'))
      );
    } else {
      localStorage.setItem(
        'income-categories',
        JSON.stringify([
          ...incomeCategories,
          { id: Date.now(), title: enteredCategory.value },
        ])
      );

      setIncomeCategories(
        JSON.parse(localStorage.getItem('income-categories'))
      );
    }
  };

  const addCategoryHandler = (enteredCategory, list) => {
    if (status === 'authenticated') {
      addCategoryAPI(enteredCategory, list);
    }
    if (status === 'unauthenticated' && anonyUser) {
      addCategoryLocal(enteredCategory, list);
    }
  };

  const updateItemAPI = async (itemId, list, queryData) => {
    let url = `/api/${list}`;

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ itemId, queryData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const parsedResponse = await res.json();

      if (res.ok) {
        if (list === 'expenses') {
          setExpenses(parsedResponse.data);
          return;
        }
        setIncomes(parsedResponse.data);
        return;
      }
      console.log(parsedResponse.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateItemLocal = (itemId, list, queryData) => {
    if (list === 'expenses') {
      const updatedExpenses = expenses.map((item) => {
        if (item.id === itemId) {
          return { ...item, ...queryData };
        }
        return item;
      });
      setExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      return;
    }

    const updatedIncomes = incomes.map((item) => {
      if (item.id === itemId) {
        return { ...queryData };
      }
      return item;
    });
    setIncomes(updatedIncomes);
    localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
  };

  const updateItemHandler = (itemId, list, queryData) => {
    if (status === 'authenticated') {
      updateItemAPI(itemId, list, queryData);
    }
    if (status === 'unauthenticated' && anonyUser) {
      updateItemLocal(itemId, list, queryData);
    }
  };

  const deleteItemAPI = async (itemId, list) => {
    let url = `/api/${list}`;

    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parsedResponse = await res.json();

    if (list === 'expenses') {
      setExpenses(parsedResponse.data);
      return;
    }
    setIncomes(parsedResponse.data);
  };

  const deleteItemLocal = (itemId, list) => {
    if (list === 'expenses') {
      const expenses = JSON.parse(localStorage.getItem('expenses'));

      const item = expenses.find((i) => i.id === itemId);
      const itemIndex = expenses.indexOf(item);

      if (itemIndex > -1) {
        expenses.splice(itemIndex, 1);
        setExpenses([...expenses]);
        localStorage.setItem('expenses', JSON.stringify(expenses));
      }
      return;
    }
    const item = incomes.find((i) => i.id === itemId);
    const itemIndex = incomes.indexOf(item);

    if (itemIndex > -1) {
      incomes.splice(itemIndex, 1);
      setIncomes([...incomes]);
      localStorage.setItem('incomes', JSON.stringify(incomes));
    }
  };

  const deleteItemHandler = (itemId, list) => {
    if (status === 'authenticated') {
      deleteItemAPI(itemId, list);
    }
    if (status === 'unauthenticated' && anonyUser) {
      deleteItemLocal(itemId, list);
    }
  };

  useEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Flow');
    setFilter(true);
  }, []);

  return (
    <>
      <Head>
        <title>Arise | Flow</title>
        <meta name='description' content='The Best Budget Tracking App!' />
        <link rel='shortcut icon' href='public/favicon.ico' />
      </Head>
      <FlowLists
        queries={{ expenses, incomes }}
        onUpdateItem={updateItemHandler}
        onDeleteItem={deleteItemHandler}
        onAddCategory={addCategoryHandler}
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

export default Flow;
