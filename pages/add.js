import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAnonymousUser } from 'context/AnonymousContext';
import { INIT_CATEGORIES } from 'lib/initData';

import Head from 'next/head';
import EntryForm from 'components/add/EntryForm';
import Modal from '@/ui/Modal';

const AddEntry = (props) => {
  const { status } = useSession();
  const [anonyUser] = useAnonymousUser();
  const [categories, setCategories] = useState(INIT_CATEGORIES);

  const fetchCategoriesAPI = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        //handle bad response
      }
    } catch (error) {
      throw new Error(error.message);
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

      const response = await res.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const addItemLocal = (queryData, queryList) => {
    const currentLocalJSON = localStorage.getItem(queryList);
    if (!currentLocalJSON) {
      localStorage.setItem(
        queryList,
        JSON.stringify([{ id: Date.now(), ...queryData }])
      );
      return;
    }
    const parsedJSON = JSON.parse(currentLocalJSON);

    parsedJSON.push({ id: Date.now(), ...queryData });
    localStorage.setItem(queryList, JSON.stringify(parsedJSON));
  };

  const addItemHandler = (queryData, queryList) => {
    if (status === 'unauthenticated' && anonyUser) {
      addItemLocal(queryData, queryList);
    }
    if (status === 'authenticated') {
      addItemAPI(queryData, queryList);
    }
  };

  const addCategoryAPI = async (label, type, icon) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify({
          label: label,
          type: type,
          icon: icon,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const addCategoryLocal = (label, type, icon) => {
    localStorage.setItem(
      'categories',
      JSON.stringify([
        ...categories,
        {
          id: Date.now(),
          label: label,
          type: type,
          icon: icon,
        },
      ])
    );

    setCategories(JSON.parse(localStorage.getItem('categories')));
  };

  const addCategoryHandler = (label, type, icon) => {
    if (status === 'unauthenticated' && anonyUser) {
      addCategoryLocal(label, type, icon);
    }
    if (status === 'authenticated') {
      addCategoryAPI(label, type, icon);
    }
  };

  useEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Entries');
    setFilter(false);
  }, [props.layout]);

  return (
    <>
      <Head>
        <title>Arise | Add</title>
        <meta name='description' content='The Best Budget Tracking App!' />
        <link
          rel='shortcut icon'
          type='image/x-icon'
          href='public/favicon.ico'
        />
      </Head>
      <EntryForm
        categories={categories}
        onAddItem={addItemHandler}
        onAddCategory={addCategoryHandler}
      />
    </>
  );
};

export default AddEntry;
