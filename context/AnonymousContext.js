import { createContext, useContext, useState } from 'react';

const AnonymousContext = createContext();

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
