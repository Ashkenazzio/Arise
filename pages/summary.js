import SummaryPage from '@/summary/SummaryPage';
import { useDb } from 'context/DbContext';
import { useLayoutEffect, useState } from 'react';
import { useAuthUser } from 'context/AuthContext';

const Summary = (props) => {
  const [authUser] = useAuthUser();
  const [dbExpenses] = useDb();

  const [expenses, setExpenses] = useState(dbExpenses);

  useLayoutEffect(() => {
    if (!authUser) {
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
