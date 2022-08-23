import "./index.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Results from "./components/Results";
import ListPage from "./components/ListPage";
import Footer from "./components/Footer";
import ShowPage from "./components/ShowPage";
import Lists from "./components/Lists";
import SeriesPage from "./components/SeriesPage";
import MoviesPage from "./components/MoviesPage";

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

  // Gets first two pages worth of top rated shows which will be added to the home page top rated carousel.
  const getTopShows = async () => {
    const urls = [
      `https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1`,
      `https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=2`,
    ];
    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then((allResponses) => {
        const results = allResponses.map((response) => response.results);
        const topShows = [].concat.apply([], results);

        setTopRatedTV(
          topShows
            .filter((show) => show.original_language === "en")
            .map((show) => ({
              id: show.id,
              poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
              backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
              title: show.name,
              rating: show.vote_average,
              year: show.first_air_date.split("-")[0],
              plot: show.overview,
              genre: show.genre_ids,
            }))
        );
      })
      .catch((error) => {
        console.error("Error:API", error);
      });
  };

  // Gets first two pages worth of most popular shows which will be added to the home page most popular carousel.
  const getPopularShows = async () => {
    const urls = [
      `https://api.themoviedb.org/3/tv/popular?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1`,
      `https://api.themoviedb.org/3/tv/popular?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=2`,
    ];
    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then((allResponses) => {
        const results = allResponses.map((response) => response.results);
        const popular = [].concat.apply([], results);

        setPopularTV(
          popular
            .filter((show) => show.original_language === "en")
            .map((show) => ({
              id: show.id,
              poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
              backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
              title: show.name,
              rating: show.vote_average,
              year: show.first_air_date.split("-")[0],
              plot: show.overview,
              genre: show.genre_ids,
            }))
        );
      })
      .catch((error) => {
        console.error("Error:API", error);
      });
  };

  const searchTvShow = async (value) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1&query=${value}&include_adult=true`,
        { mode: "cors" }
      );
      const tvShows = await response.json();
      setResults(
        tvShows.results
          .filter((show) => show.original_language === "en")
          .map((show) => ({
            id: show.id,
            poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
            title: show.name,
            rating: show.vote_average,
            year: show.first_air_date,
            plot: show.overview,
            genre: show.genre_ids,
          }))
      );
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  useEffect(() => {
    getTopShows();
    getPopularShows();
  }, []);

  //   // localStorage.setDroppedList("droppedShowsList", JSON.stringify(droppedList));
  // }, [results, watchingList, wantToWatchList, completedList, droppedList]);

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
            getTopShows={getTopShows}
            getPopularShows={getPopularShows}
            searchTvShow={searchTvShow}
          />
          <Routes>
            <Route
              path="/"
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
            <Route
              path={`/shows/id:${showPage.id}`}
              element={<ShowPage id={showPage.id} />}
            />
            {/* <Route path="/series" element={<SeriesPage />}></Route> */}
            {/* <Route path="/movies" element={<MoviesPage />}></Route> */}
          </Routes>
          <Footer />
        </SetListsContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
