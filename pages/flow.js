import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAnonymousUser } from 'context/AnonymousContext';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { INIT_CATEGORIES } from 'lib/initData';

import Head from 'next/head';
import FlowLists from '@/flow/FlowLists';
import Prompt from '@/ui/Prompt';

const Flow = (props) => {
  const { status } = useSession();
  const [anonyUser] = useAnonymousUser();
  const { fetchedExpenses, fetchedIncomes } = props.queries;

  const [expenses, setExpenses] = useState(fetchedExpenses);
  const [incomes, setIncomes] = useState(fetchedIncomes);
  const [categories, setCategories] = useState(props.categories);
  const [prompt, setPrompt] = useState(props.fetchedError);

  const closePromptHandler = () => {
    setPrompt({
      res: null,
      ok: null,
      message: '',
    });
  };

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

  const fetchCategoriesLocal = () => {
    const localCategoriesJSON = localStorage.getItem('categories');

    if (localCategoriesJSON) {
      setCategories(JSON.parse(localCategoriesJSON));
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated' && anonyUser) {
      fetchCategoriesLocal();
    }
  }, [status, anonyUser]);

  const addCategoryAPI = async (queryData) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(queryData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const parsedResponse = await res.json();
      if (res.ok) {
        setCategories(parsedResponse.data);
        setPrompt({ res: true, ok: true, message: parsedResponse.message });
      } else {
        setPrompt({ res: true, ok: false, message: parsedResponse.message });
      }
    } catch (error) {
      throw Error(error);
    }
  };

  const addCategoryLocal = (queryData) => {
    const { label, type, icon } = queryData;

    localStorage.setItem(
      'categories',
      JSON.stringify([
        ...categories,
        { id: Date.now(), label: label, type: type, icon: icon },
      ])
    );

    setCategories(JSON.parse(localStorage.getItem('categories')));
    setPrompt({
      res: true,
      ok: true,
      message: 'Category Added Successfully 👍🏻',
    });
  };

  const addCategoryHandler = (queryData) => {
    if (status === 'authenticated') {
      addCategoryAPI(queryData);
    }
    if (status === 'unauthenticated' && anonyUser) {
      addCategoryLocal(queryData);
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
          setPrompt({ res: true, ok: true, message: parsedResponse.message });
          return;
        }
        setIncomes(parsedResponse.data);
        setPrompt({ res: true, ok: true, message: parsedResponse.message });
      } else {
        setPrompt({
          res: true,
          ok: false,
          message: parsedResponse.message,
        });
      }
    } catch (error) {
      throw Error(error);
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

      setPrompt({
        res: true,
        ok: true,
        message: 'Item Updated Successfully 👍🏻',
      });
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

    setPrompt({
      res: true,
      ok: true,
      message: 'Item Updated Successfully 👍🏻',
    });
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
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ itemId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const parsedResponse = await res.json();
      if (res.ok) {
        if (list === 'expenses') {
          setExpenses(parsedResponse.data);
          setPrompt({ res: true, ok: true, message: parsedResponse.message });
          return;
        }
        setIncomes(parsedResponse.data);
        setPrompt({ res: true, ok: true, message: parsedResponse.message });
      } else {
        setPrompt({
          res: true,
          ok: false,
          message: parsedResponse.message,
        });
      }
    } catch (error) {
      throw Error(error);
    }
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

      setPrompt({
        res: true,
        ok: true,
        message: 'Item Deleted Successfully 👍🏻',
      });
      return;
    }

    const item = incomes.find((i) => i.id === itemId);
    const itemIndex = incomes.indexOf(item);

    if (itemIndex > -1) {
      incomes.splice(itemIndex, 1);
      setIncomes([...incomes]);
      localStorage.setItem('incomes', JSON.stringify(incomes));
    }

    setPrompt({
      res: true,
      ok: true,
      message: 'Item Deleted Successfully 👍🏻',
    });
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
    const [setTitle, setFilter, setQueryControl] = props.layout;

    setTitle('Flow');
    setQueryControl(false);
    setFilter(true);
  }, [props.layout]);

  return (
    <>
      <Head>
        <title>Arise | Flow</title>
      </Head>
      <FlowLists
        queries={{ expenses, incomes }}
        categories={categories}
        filter={props.filter}
        onUpdateItem={updateItemHandler}
        onDeleteItem={deleteItemHandler}
        onAddCategory={addCategoryHandler}
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
  let fetchedCategories = INIT_CATEGORIES;
  let fetchedError = {
    res: null,
    ok: null,
    message: '',
  };

  if (session) {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/expenses`, {
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
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/incomes`, {
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

    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
        headers: {
          cookie: req.headers.cookie,
        },
      });
      const parsedResponse = await res.json();

      if (res.ok) {
        fetchedCategories = parsedResponse;
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
      categories: fetchedCategories,
      fetchedError: fetchedError,
    },
  };
}

export default Flow;
