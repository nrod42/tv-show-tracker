
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Lists from "./pages/Lists";
import ListPage from "./pages/ListPage";
import CategoryPage from "./pages/CategoryPage";
import MediaPage from "./pages/MediaPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PersonPage from "./pages/PersonPage";
import FullCreditsPage from "./pages/FullCreditsPage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/tv-show-tracker" element={<Home />} />
        <Route path="/tv-show-tracker/register" element={<RegisterPage />} />
        <Route path="/tv-show-tracker/login" element={<LoginPage />} />
        <Route path="/tv-show-tracker/results/:query" element={<Results />} />
        <Route path="/tv-show-tracker/lists" element={<Lists />} />
        <Route path="/tv-show-tracker/lists/:listType" element={<ListPage />} />
        <Route path="/tv-show-tracker/:mediaType/:id" element={<MediaPage />} />
        <Route path="/tv-show-tracker/:mediaType/credits/:id" element={<FullCreditsPage />} />
        <Route path="/tv-show-tracker/:mediaType/category/:category" element={<CategoryPage />} />
        <Route path="/tv-show-tracker/people/:actorId" element={<PersonPage />} />

      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
