import React, { useState } from "react";
import { DarkModeContextProvider } from "./DarkModeContext";
import { UserContextProvider } from "./UserContext";
import Nav from "./components/Nav";
import AnimatedRoutes from "./AnimatedRoutes";
import { MediaContextProvider } from "./MediaContext";

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
