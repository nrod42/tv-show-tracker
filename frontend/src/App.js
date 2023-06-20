import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Lists from "./pages/Lists";
import ListPage from "./pages/ListPage";
import {
  getTopMedia,
  getPopularMedia,
  getAiringTodayTV,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "./components/API/getMedia";
import CategoryPage from "./pages/CategoryPage";
import MediaPage from "./pages/MediaPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

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
    <div className="App">
      <UserContextProvider>
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
            <Route path="tv-show-tracker/register" element={<RegisterPage />} />
            <Route path="tv-show-tracker/login" element={<LoginPage />} />
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
              element={<MediaPage />}
            />
            <Route
              path="/tv-show-tracker/movies/top-rated"
              element={
                <CategoryPage
                  key="top"
                  type={"movie"}
                  title={"Top Rated Movies"}
                  getMedia={getTopMedia}
                />
              }
            />
            <Route
              path="/tv-show-tracker/movies/popular"
              element={
                <CategoryPage
                  key="popular"
                  type={"movie"}
                  title={"Popular Movies"}
                  getMedia={getPopularMedia}
                />
              }
            />
            <Route
              path="/tv-show-tracker/movies/upcoming"
              element={
                <CategoryPage
                  key="upcoming"
                  type={"movie"}
                  title={"Upcoming Movies"}
                  getMedia={getUpcomingMovies}
                />
              }
            />
            <Route
              path="/tv-show-tracker/movies/now-playing"
              element={
                <CategoryPage
                  key="now-playing"
                  type={"movie"}
                  title={"Now Playing"}
                  getMedia={getNowPlayingMovies}
                />
              }
            />
            <Route
              path={`/tv-show-tracker/shows/id:${showPage.id}`}
              element={<MediaPage />}
            />
            <Route
              path="/tv-show-tracker/tv/top-rated"
              element={
                <CategoryPage
                  key="top-tv"
                  type={"tv"}
                  title={"Top Rated TV"}
                  getMedia={getTopMedia}
                />
              }
            />
            <Route
              path="/tv-show-tracker/tv/popular"
              element={
                <CategoryPage
                  key="popular-tv"
                  type={"tv"}
                  title={"Popular TV"}
                  getMedia={getPopularMedia}
                />
              }
            />
            <Route
              path="/tv-show-tracker/tv/airing-today"
              element={
                <CategoryPage
                  key="airing-today"
                  type={"tv"}
                  title={"Airing Today"}
                  getMedia={getAiringTodayTV}
                />
              }
            />
          </Routes>
        </SetListsContext.Provider>
      </UserContextProvider>
      <footer>© {new Date().getFullYear()} - Nigel Rodriguez</footer>
    </div>
  );
};

export default App;
