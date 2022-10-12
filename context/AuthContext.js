import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export function useAuthUser() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};
