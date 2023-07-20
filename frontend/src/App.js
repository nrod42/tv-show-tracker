import React, { useState } from "react";
import { UserContextProvider } from "./UserContext";
import Nav from "./components/Nav";
import AnimatedRoutes from "./AnimatedRoutes";

const App = () => {
  const [searchQuery, setSearchQuery] = useState([]);

  return (
    <div className="App">
      <UserContextProvider>
        <Nav setSearchQuery={setSearchQuery} />
        <AnimatedRoutes searchQuery={searchQuery} />
      </UserContextProvider>
      <footer>© {new Date().getFullYear()} - Nigel Rodriguez</footer>
    </div>
  );
};

export default App;
