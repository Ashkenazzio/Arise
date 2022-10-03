import React, { useContext, useState } from 'react';

const AnonymousContext = React.createContext();

export function useAnonymousUser() {
  return useContext(AnonymousContext);
}

export const AnonymousProvider = ({ children }) => {
  const [anonyUser, setAnonyUser] = useState(false);

  return (
    <AnonymousContext.Provider value={[anonyUser, setAnonyUser]}>
      {children}
    </AnonymousContext.Provider>
  );
};
