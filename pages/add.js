import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAnonymousUser } from 'context/AnonymousContext';
import { INIT_CATEGORIES } from 'lib/initData';

import Head from 'next/head';
import EntryForm from 'components/add/EntryForm';
import Prompt from '@/ui/Prompt';

const AddEntry = (props) => {
  const { status } = useSession();
  const [anonyUser] = useAnonymousUser();
  const [categories, setCategories] = useState(INIT_CATEGORIES);
  const [prompt, setPrompt] = useState({
    res: null,
    ok: null,
    message: '',
  });

  const closePromptHandler = () => {
    setPrompt({
      res: null,
      ok: null,
      message: '',
    });
  };

  const fetchCategoriesAPI = async () => {
    try {
      const res = await fetch('/api/categories');
      const parsedResponse = await res.json();

      if (res.ok) {
        setCategories(parsedResponse);
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

  const fetchCategoriesLocal = () => {
    const localCategoriesJSON = localStorage.getItem('categories');

    if (localCategoriesJSON) {
      setCategories(JSON.parse(localCategoriesJSON));
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCategoriesAPI();
    }
    if (status === 'unauthenticated' && anonyUser) {
      fetchCategoriesLocal();
    }
  }, [status, anonyUser]);

  const addItemAPI = async (queryData, queryList) => {
    let url = `/api/${queryList}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(queryData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const parsedResponse = await res.json();

      if (res.ok) {
        setPrompt({
          res: true,
          ok: true,
          message: parsedResponse.message,
        });
      } else {
        setPrompt({
          res: true,
          ok: false,
          message: parsedResponse.message,
        });
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

  const addItemLocal = (queryData, queryList) => {
    const currentLocalJSON = localStorage.getItem(queryList);
    if (!currentLocalJSON) {
      localStorage.setItem(
        queryList,
        JSON.stringify([{ id: Date.now(), ...queryData }])
      );
      setPrompt({
        res: true,
        ok: true,
        message: `${
          queryList === 'expenses' ? 'Expense' : 'Income'
        } Stored Successfully 👍🏻`,
      });
    }
    const parsedJSON = JSON.parse(currentLocalJSON);

    parsedJSON.push({ id: Date.now(), ...queryData });
    localStorage.setItem(queryList, JSON.stringify(parsedJSON));

    setPrompt({
      res: true,
      ok: true,
      message: `${
        queryList === 'expenses' ? 'Expense' : 'Income'
      } Added Successfully 👍🏻`,
    });
  };

  const addItemHandler = (queryData, queryList) => {
    if (status === 'unauthenticated' && anonyUser) {
      addItemLocal(queryData, queryList);
    }
    if (status === 'authenticated') {
      addItemAPI(queryData, queryList);
    }
  };

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
    if (status === 'unauthenticated' && anonyUser) {
      addCategoryLocal(queryData);
    }
    if (status === 'authenticated') {
      addCategoryAPI(queryData);
    }
  };

  useEffect(() => {
    const [setTitle, setFilter, setQueryControl] = props.layout;

    setTitle('Entries');
    setQueryControl(false);
    setFilter(false);
  }, [props.layout]);

  return (
    <>
      <Head>
        <title>Arise | Add</title>
      </Head>
      <EntryForm
        categories={categories}
        onAddItem={addItemHandler}
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

export default AddEntry;
