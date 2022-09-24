import React, { useContext, useState } from 'react';

const SessionContext = React.createContext();

export function useSession() {
  return useContext(SessionContext);
}

export const SessionProvider = ({ children }) => {
  const [localSession, setLocalSession] = useState(false);

  return (
    <SessionContext.Provider value={[localSession, setLocalSession]}>
      {children}
    </SessionContext.Provider>
  );
};
