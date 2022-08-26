import "./index.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Results from "./components/Results";
import ListPage from "./components/ListPage";
import Footer from "./components/Footer";
import ShowPage from "./components/ShowPage";
import Lists from "./components/Lists";
import TopTVPage from "./components/TopTVPage";
import PopularTVPage from "./components/PopularTVPage";
import AiringTodayTVPage from "./components/AiringTodayTVPage";

// import MoviesPage from "./components/MoviesPage";

export const SetListsContext = React.createContext();

const App = () => {
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [results, setResults] = useState([]);
  const [watchingList, setWatchingList] = useState([]);
  const [wantToWatchList, setWantToWatchList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [droppedList, setDroppedList] = useState([]);
  const [showPage, setShowPage] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <SetListsContext.Provider
          value={{
            setWatchingList,
            setWantToWatchList,
            setCompletedList,
            setDroppedList,
            setShowPage,
            watchingList,
            wantToWatchList,
            completedList,
            droppedList,
          }}
        >
          <Nav
            setTopRatedTV={setTopRatedTV}
            setPopularTV={setPopularTV}
            setResults={setResults}
          />
          <Routes>
            <Route
              path="/tv-show-tracker"
              element={<Home topRatedTV={topRatedTV} popularTV={popularTV} />}
            />
            <Route path="/results" element={<Results results={results} />} />
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
                <ListPage list={completedList} title={"Completed Shows"} />
              }
            />
            <Route
              path="/lists/dropped"
              element={<ListPage list={droppedList} title={"Dropped Shows"} />}
            />
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
