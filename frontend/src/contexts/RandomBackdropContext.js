import React, { createContext, useState } from "react";

const RandomBackdropContext = createContext({});
const RandomBackdropContextProvider = ({ children }) => {
  const [randomBackdrop, setRandomBackdrop] = useState("");
  return (
    <RandomBackdropContext.Provider
      value={{ randomBackdrop, setRandomBackdrop }}
    >
      {children}
    </RandomBackdropContext.Provider>
  );
};

export { RandomBackdropContext, RandomBackdropContextProvider };
