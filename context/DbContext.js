import React, { useContext } from 'react';

const DUMMY_EXP = [
  {
    id: 'e1',
    title: 'burger',
    type: 'expense',
    sum: 57,
    date: '14/08/2022',
    category: { id: 'ex1', title: 'Eating Out', value: 'eating_out' },
    notes: 'was good',
  },
  {
    id: 'e2',
    title: 'electricity bill',
    type: 'expense',
    sum: 142.81,
    date: '15/08/2022',
    category: { id: 'ex7', title: 'Utilities', value: 'uilities' },
    notes: 'thieves',
  },
  {
    id: 'e3',
    title: 'water bill',
    type: 'expense',
    sum: 91.22,
    date: '15/08/2022',
    category: { id: 'ex7', title: 'Utilities', value: 'uilities' },
    notes: 'thieves',
  },
  {
    id: 'e4',
    title: 'concert',
    type: 'expense',
    sum: 248,
    date: '17/08/2022',
    category: { id: 'ex2', title: 'Fun', value: 'fun' },
    notes: 'thieves',
  },
  {
    id: 'e5',
    title: 'laptop',
    type: 'expense',
    sum: 9248,
    date: '17/08/2022',
    category: { id: 'ex9', title: 'Work', value: 'work' },
    notes: 'thieves',
  },
];

const DUMMY_INC = [
  {
    id: 'i1',
    title: 'salary',
    sum: 12326,
    date: '10/08/2022',
    category: { id: 'in2', title: 'Salary', value: 'salary' },
    notes: 'very good',
  },
  {
    id: 'i2',
    title: 'side-job',
    sum: 742,
    date: '13/08/2022',
    category: { id: 'in2', title: 'Misc.', value: 'miscellaneous' },
    notes: 'good',
  },
];

const DbContext = React.createContext();

export function useDb() {
  return useContext(DbContext);
}

export const DbProvider = ({ children }) => {
  const dbs = [DUMMY_EXP, DUMMY_INC];

  return <DbContext.Provider value={dbs}>{children}</DbContext.Provider>;
};
