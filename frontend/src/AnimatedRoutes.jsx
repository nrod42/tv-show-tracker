import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import WatchListTabsPage from "./pages/WatchListTabsPage";
import WatchListPage from "./pages/WatchListPage";
import CategoryPage from "./pages/CategoryPage.tsx";
import MediaPage from "./pages/MediaPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PersonPage from "./pages/PersonPage";
import FullCreditsPage from "./pages/FullCreditsPage.tsx";
import RelatedMediaPage from "./pages/RelatedMediaPage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/results/:query" element={<SearchResultsPage />} />
        <Route path="/lists" element={<WatchListTabsPage />} />
        <Route path="/lists/:listType" element={<WatchListPage />} />
        <Route path="/:mediaType/:id" element={<MediaPage />} />
        <Route path="/:mediaType/credits/:id" element={<FullCreditsPage />} />
        <Route path="/:mediaType/category/:category" element={<CategoryPage />} />
        <Route
          path="/:mediaType/related/:relation/:id"
          element={<RelatedMediaPage />}
        />
        <Route path="/people/:actorId" element={<PersonPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
