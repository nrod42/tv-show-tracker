import React from "react";
import { DarkModeContextProvider } from "./contexts/DarkModeContext";
import { RandomBackdropContextProvider } from "./contexts/RandomBackdropContext";
import { UserContextProvider } from "./contexts/UserContext";
import Nav from "./components/Navbar/Nav";
import AnimatedRoutes from "./AnimatedRoutes";

const App = () => {
  return (
    <div className="App">
      <DarkModeContextProvider>
        <UserContextProvider>
          <RandomBackdropContextProvider>
            <Nav />
            <AnimatedRoutes />
            <footer>© {new Date().getFullYear()} - Nigel Rodriguez</footer>
          </RandomBackdropContextProvider>
        </UserContextProvider>
      </DarkModeContextProvider>
    </div>
  );
};

export default App;
