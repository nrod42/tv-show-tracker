import React from "react";
import { DarkModeContextProvider } from "./contexts/DarkModeContext";
import { RandomBackdropContextProvider } from "./contexts/RandomBackdropContext";
import { UserContextProvider } from "./contexts/UserContext";
import Nav from "./components/Navbar/Nav";
import AnimatedRoutes from "./AnimatedRoutes";

const App = () => {
  return (
    <UserContextProvider>
    <div className="App">
      
        <DarkModeContextProvider>
          <RandomBackdropContextProvider>
            <Nav />
            <AnimatedRoutes />
            <footer>© {new Date().getFullYear()} - Nigel Rodriguez</footer>
          </RandomBackdropContextProvider>
        </DarkModeContextProvider>
     

    </div>
    </UserContextProvider>
  );
};

export default App;
