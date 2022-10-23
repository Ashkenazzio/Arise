import { useEffect, useState } from 'react';
import { INIT_CATEGORIES } from 'lib/initData';
import { useSession } from 'next-auth/react';
import { useAnonymousUser } from 'context/AnonymousContext';

import styles from './FlowLists.module.css';
import FlowList from './FlowList';
import Balance from './Balance';

const FlowLists = (props) => {
  const { expenses, incomes } = props.queries;
  const [categories, setCategories] = useState(INIT_CATEGORIES);

  const { status } = useSession();
  const [anonyUser] = useAnonymousUser();

  const fetchCategoriesAPI = async () => {
    try {
      const response = await fetch('/api/categories');
      const categories = await response.json();

      setCategories(categories);
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
  }, []);

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

  return (
    <div className={styles.view}>
      <FlowList
        list='Expenses'
        queries={expenses}
        categories={categories}
        onUpdateItem={props.onUpdateItem}
        onDeleteItem={props.onDeleteItem}
        onAddCategory={addCategoryHandler}
      />
      <Balance queries={{ expenses, incomes }} />
      <FlowList
        list='Incomes'
        queries={incomes}
        categories={categories}
        onUpdateItem={props.onUpdateItem}
        onDeleteItem={props.onDeleteItem}
        onAddCategory={addCategoryHandler}
      />
    </div>
  );
};

export default FlowLists;
