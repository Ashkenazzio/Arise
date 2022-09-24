import React, { useContext, useState } from 'react';

const LayoutContext = React.createContext();

export function useLayout() {
  return useContext(LayoutContext);
}

export const LayoutProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [sort, setSort] = useState(false);

  return (
    <LayoutContext.Provider value={[title, setTitle, sort, setSort]}>
      {children}
    </LayoutContext.Provider>
  );
};
