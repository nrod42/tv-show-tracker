import React, { useState, useContext } from "react";
import { UserContextProvider } from "./UserContext";
import Nav from "./components/Nav";
import AnimatedRoutes from "./AnimatedRoutes";
import { DarkModeContextProvider } from "./DarkModeContext";

const App = () => {
  
  const [searchQuery, setSearchQuery] = useState([]);

  return (
      <div className="App">
        <DarkModeContextProvider>
          <UserContextProvider>
              <Nav setSearchQuery={setSearchQuery} />
              <AnimatedRoutes searchQuery={searchQuery}/>
          </UserContextProvider>
          <footer>© {new Date().getFullYear()} - Nigel Rodriguez</footer>
        </DarkModeContextProvider>
      </div>
  );
};

export default App;
