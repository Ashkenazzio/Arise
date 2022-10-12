import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };

  return (
    <ThemeContext.Provider value={[darkTheme, toggleTheme, setDarkTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
