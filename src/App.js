import "./index.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Results from "./components/Results";

import Lists from "./components/Lists";
import ListPage from "./components/ListPage";

import ShowPage from "./components/ShowPage";
import TopTVPage from "./components/TopTVPage";
import PopularTVPage from "./components/PopularTVPage";
import AiringTodayTVPage from "./components/AiringTodayTVPage";

import MoviePage from "./components/MoviePage";
import TopMoviesPage from "./components/TopMoviesPage";
import PopularMoviesPage from "./components/PopularMoviesPage";
import UpcomingMoviesPage from "./components/UpcomingMoviesPage";
import NowPlayingMoviesPage from "./components/NowPlayingMoviesPage";

import Footer from "./components/Footer";

export const SetListsContext = React.createContext();

const App = () => {
  const [moviePage, setMoviePage] = useState("");
  const [showPage, setShowPage] = useState("");
  const [searchQuery, setSearchQuery] = useState([]);
  const [watchingList, setWatchingList] = useState([]);
  const [wantToWatchList, setWantToWatchList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [droppedList, setDroppedList] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <SetListsContext.Provider
          value={{
            setShowPage,
            setMoviePage,
            setWatchingList,
            setWantToWatchList,
            setCompletedList,
            setDroppedList,
            watchingList,
            wantToWatchList,
            completedList,
            droppedList,
          }}
        >
          <Nav
            setSearchQuery={setSearchQuery}
          />
          <Routes>
            <Route
              path="/tv-show-tracker"
              element={<Home />}
            />
            <Route path="/results" element={<Results searchQuery={searchQuery} />} />
            <Route path="/lists" element={<Lists />}></Route>
            <Route
              path="/lists/currently-watching"
              element={
                <ListPage list={watchingList} title={"Currently Watching"} />
              }
            />
            <Route
              path="/lists/want-to-watch"
              element={
                <ListPage list={wantToWatchList} title={"Want To Watch"} />
              }
            />
            <Route
              path="/lists/completed"
              element={
                <ListPage list={completedList} title={"Completed"} />
              }
            />
            <Route
              path="/lists/dropped"
              element={<ListPage list={droppedList} title={"Dropped"} />}
            />
            <Route path={`/movies/id:${moviePage.id}`} element={<MoviePage />} />
            <Route path="/movies/top-rated" element={<TopMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
            <Route path={`/shows/id:${showPage.id}`} element={<ShowPage />} />
            <Route path="/series/top-rated" element={<TopTVPage />} />
            <Route path="/series/popular" element={<PopularTVPage />} />
            <Route
              path="/series/airing-today"
              element={<AiringTodayTVPage />}
            />
          </Routes>
          <Footer />
        </SetListsContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
