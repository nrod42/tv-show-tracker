import React, { useState, useEffect } from "react";
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

export const SetListsContext = React.createContext();

const App = () => {
  const [moviePage, setMoviePage] = useState("");
  const [showPage, setShowPage] = useState("");
  const [searchQuery, setSearchQuery] = useState([]);

  const [watchingList, setWatchingList] = useState(() => {
    const saved = localStorage.getItem("watchingList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [wantToWatchList, setWantToWatchList] = useState(() => {
    const saved = localStorage.getItem("wantToWatchList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [completedList, setCompletedList] = useState(() => {
    const saved = localStorage.getItem("completedList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [droppedList, setDroppedList] = useState(() => {
    const saved = localStorage.getItem("droppedList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("watchingList", JSON.stringify(watchingList));
    localStorage.setItem("wantToWatchList", JSON.stringify(wantToWatchList));
    localStorage.setItem("completedList", JSON.stringify(completedList));
    localStorage.setItem("droppedList", JSON.stringify(droppedList));
  }, [watchingList, wantToWatchList, completedList, droppedList]);

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
          <Nav setSearchQuery={setSearchQuery} />
          <Routes>
            <Route path="/tv-show-tracker" element={<Home />} />
            <Route
              path="/tv-show-tracker/results"
              element={<Results searchQuery={searchQuery} />}
            />
            <Route path="/tv-show-tracker/lists" element={<Lists />}></Route>
            <Route
              path="/tv-show-tracker/lists/currently-watching"
              element={
                <ListPage list={watchingList} title={"Currently Watching"} />
              }
            />
            <Route
              path="/tv-show-tracker/lists/want-to-watch"
              element={
                <ListPage list={wantToWatchList} title={"Want To Watch"} />
              }
            />
            <Route
              path="/tv-show-tracker/lists/completed"
              element={<ListPage list={completedList} title={"Completed"} />}
            />
            <Route
              path="/tv-show-tracker/lists/dropped"
              element={<ListPage list={droppedList} title={"Dropped"} />}
            />
            <Route
              path={`/tv-show-tracker/movies/id:${moviePage.id}`}
              element={<MoviePage />}
            />
            <Route
              path="/tv-show-tracker/movies/top-rated"
              element={<TopMoviesPage />}
            />
            <Route
              path="/tv-show-tracker/movies/popular"
              element={<PopularMoviesPage />}
            />
            <Route
              path="/tv-show-tracker/movies/upcoming"
              element={<UpcomingMoviesPage />}
            />
            <Route
              path="/tv-show-tracker/movies/now-playing"
              element={<NowPlayingMoviesPage />}
            />
            <Route
              path={`/tv-show-tracker/shows/id:${showPage.id}`}
              element={<ShowPage />}
            />
            <Route
              path="/tv-show-tracker/series/top-rated"
              element={<TopTVPage />}
            />
            <Route
              path="/tv-show-tracker/series/popular"
              element={<PopularTVPage />}
            />
            <Route
              path="/tv-show-tracker/series/airing-today"
              element={<AiringTodayTVPage />}
            />
          </Routes>
          <footer>© 2022 - Nigel Rodriguez</footer>
        </SetListsContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
