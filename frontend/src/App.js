import React from "react";
import { DarkModeContextProvider } from "./Contexts/DarkModeContext";
import { MediaContextProvider } from "./Contexts/MediaContext";
import { UserContextProvider } from "./Contexts/UserContext";
import Nav from "./components/Nav";
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
