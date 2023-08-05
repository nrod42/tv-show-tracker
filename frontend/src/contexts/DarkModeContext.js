import React, { useState, createContext } from "react";

const DarkModeContext = createContext({});
const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeContextProvider };
