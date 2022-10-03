import React, { useContext, useState } from 'react';

const CurrencyContext = React.createContext();

export function useCurrency() {
  return useContext(CurrencyContext);
}

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({
    id: 'c1',
    name: '$ - USD',
    value: '$',
  });

  return (
    <CurrencyContext.Provider value={[currency, setCurrency]}>
      {children}
    </CurrencyContext.Provider>
  );
};
