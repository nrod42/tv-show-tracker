import React from "react";
import { DarkModeContextProvider } from "./contexts/DarkModeContext";
import { MediaContextProvider } from "./contexts/MediaContext";
import { UserContextProvider } from "./contexts/UserContext";
import Nav from "./components/Navbar/Nav";
import AnimatedRoutes from "./AnimatedRoutes";

const App = () => {
  return (
    <div className="App">
      <DarkModeContextProvider>
        <UserContextProvider>
          <MediaContextProvider>
            <Nav />
            <AnimatedRoutes />
            <footer>© {new Date().getFullYear()} - Nigel Rodriguez</footer>
          </MediaContextProvider>
        </UserContextProvider>
      </DarkModeContextProvider>
    </div>
  );
};

export default App;
