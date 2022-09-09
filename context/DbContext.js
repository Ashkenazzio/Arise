import React, { useContext } from 'react';

const DbContext = React.createContext();

export function useDb() {
  return useContext(DbContext);
}

export const DbProvider = ({ children }) => {
  const dbs = [
    [
      {
        id: 'e1',
        title: 'burger',
        type: 'expense',
        sum: 57,
        date: '14/08/2022',
        category: 'Food',
        notes: 'was good',
      },
      {
        id: 'e2',
        title: 'electricity bill',
        type: 'expense',
        sum: 142.81,
        date: '15/08/2022',
        category: 'Utilities',
        notes: 'thieves',
      },
      {
        id: 'e3',
        title: 'water bill',
        type: 'expense',
        sum: 91.22,
        date: '15/08/2022',
        category: 'Utilities',
        notes: 'thieves',
      },
      {
        id: 'e4',
        title: 'concert',
        type: 'expense',
        sum: 248,
        date: '17/08/2022',
        category: 'Fun',
        notes: 'thieves',
      },
      {
        id: 'e5',
        title: 'laptop',
        type: 'expense',
        sum: 9248,
        date: '17/08/2022',
        category: 'Work',
        notes: 'thieves',
      },
    ],

    [
      {
        id: 'i1',
        title: 'salary',
        type: 'income',
        sum: 12326,
        date: '10/08/2022',
        category: 'salary',
        notes: 'very good',
      },
      {
        id: 'i2',
        title: 'side-job',
        type: 'income',
        sum: 742,
        date: '13/08/2022',
        category: 'side',
        notes: 'good',
      },
    ],
  ];

  return <DbContext.Provider value={dbs}>{children}</DbContext.Provider>;
};
