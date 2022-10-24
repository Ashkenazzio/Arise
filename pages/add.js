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

      const parsedResponse = await res.json();
      if (res.ok) {
        console.log(parsedResponse.message);
      }
      return;
    } catch (error) {
      console.log(error.message);
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
      }
      console.log(parsedResponse.message);
    } catch (error) {
      console.log(error.message);
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
    const [setTitle, setFilter] = props.layout;
    setTitle('Entries');
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
    </>
  );
};

export default AddEntry;
