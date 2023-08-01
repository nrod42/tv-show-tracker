
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
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/results/:query" element={<Results />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/lists/:listType" element={<ListPage />} />
        <Route path="/:mediaType/:id" element={<MediaPage />} />
        <Route path="/:mediaType/credits/:id" element={<FullCreditsPage />} />
        <Route path="/:mediaType/category/:category" element={<CategoryPage />} />
        <Route path="/people/:actorId" element={<PersonPage />} />

      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
