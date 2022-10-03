import SummaryPage from '@/summary/SummaryPage';
import { useDb } from 'context/DbContext';
import { useAnonymousUser } from 'context/AnonymousContext';
import { useLayoutEffect, useState } from 'react';

const Summary = (props) => {
  const [anonyUser] = useAnonymousUser();
  const [dbExpenses] = useDb();

  const [expenses, setExpenses] = useState(dbExpenses);

  useLayoutEffect(() => {
    if (anonyUser) {
      const localExpensesJSON = localStorage.getItem('expenses');

      if (localExpensesJSON) {
        setExpenses(JSON.parse(localExpensesJSON));
      } else {
        setExpenses([]);
      }
    }
  }, []);

  useLayoutEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Summary');
    setFilter(true);
  }, []);

  return <SummaryPage expenses={expenses} />;
};

export default Summary;
