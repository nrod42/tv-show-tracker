import React, { useState } from "react";
import { DarkModeContextProvider } from "./DarkModeContext";
import { UserContextProvider } from "./UserContext";
import Nav from "./components/Nav";
import AnimatedRoutes from "./AnimatedRoutes";

const App = () => {
  // const [searchQuery, setSearchQuery] = useState([]);

  return (
    <div className="App">
      <DarkModeContextProvider>
        <UserContextProvider>
          <Nav />
          <AnimatedRoutes />
        </UserContextProvider>
        <footer>© {new Date().getFullYear()} - Nigel Rodriguez</footer>
      </DarkModeContextProvider>
    </div>
  );
};

export default App;
