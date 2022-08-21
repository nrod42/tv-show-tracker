import "./index.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Results from "./components/Results";
import ListPage from "./components/ListPage";
import Card from "./components/Card";
import Footer from "./components/Footer";
import ShowPage from "./components/ShowPage";
import Lists from "./components/Lists";

const App = () => {

  const [homePage, setHomePage] = useState(1);

  const [topRated, setTopRated] = useState([]);
  const [topRatedCards, setTopRatedCards] = useState([]);

  const [popular, setPopular] = useState([]);
  const [popularCards, setPopularCards] = useState([]);

  const [results, setResults] = useState([]);
  const [resultCards, setResultCards] = useState([]);

  const [watchingList, setWatchingList] = useState([]);
  const [watchingCards, setWatchingCards] = useState([]);

  const [wantToWatchList, setWantToWatchList] = useState([]);
  const [wantToWatchCards, setwantToWatchCards] = useState([]);

  const [completedList, setCompletedList] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);

  const [droppedList, setDroppedList] = useState([]);
  const [droppedCards, setDroppedCards] = useState([]);

  const [showPage, setShowPage] = useState("");

  const getTopShows = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${homePage}`,
        { mode: "cors" }
      );
      const topShows = await response.json();

      setTopRated(
        topShows.results.filter((show) => show.original_language === "en").map((show) => ({
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
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  const getPopularShows = async () => {
    try {
      const response = await fetch(
           `https://api.themoviedb.org/3/tv/popular?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${homePage}`,
          { mode: "cors" }
      );
      const popular = await response.json();

      setPopular(
        popular.results.filter((show) => show.original_language === "en").map((show) => ({
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
    } catch (error) {
      console.error("Error:API", error);
    }
  };



  const searchTvShow = async (value) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1&query=${value}&include_adult=true`,
        { mode: "cors" }
      );
      const tvShows = await response.json();
      setResults(
        tvShows.results.filter((show) => show.original_language === "en").map((show) => ({
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
  }, [homePage]);

  useEffect(() => {
    setTopRatedCards(
      topRated.map((show) => (
        <Card
          key={show.id}
          showData={show}
          watchingList={watchingList}
          wantToWatchList={wantToWatchList}
          completedList={completedList}
          droppedList={droppedList}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          setShowPage={setShowPage}
        />
      ))
    );

    setPopularCards(
      popular.map((show) => (
        <Card
          key={show.id}
          showData={show}
          watchingList={watchingList}
          wantToWatchList={wantToWatchList}
          completedList={completedList}
          droppedList={droppedList}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          setShowPage={setShowPage}
        />
      ))
    );
    // );

    setResultCards(
      results.map((show) => (
        <Card
          key={show.id}
          showData={show}
          watchingList={watchingList}
            wantToWatchList={wantToWatchList}
            completedList={completedList}
            droppedList={droppedList}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          setShowPage={setShowPage}
        />
      ))
    );

    setWatchingCards(
      watchingList.map((show) => (
        <Card
          key={show.id}
          showData={show}
          watchingList={watchingList}
            wantToWatchList={wantToWatchList}
            completedList={completedList}
            droppedList={droppedList}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          setShowPage={setShowPage}
        />
      ))
    );

    setwantToWatchCards(
      wantToWatchList.map((show) => (
        <Card
          key={show.id}
          showData={show}
          watchingList={watchingList}
            wantToWatchList={wantToWatchList}
            completedList={completedList}
            droppedList={droppedList}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          setShowPage={setShowPage}
        />
      ))
    );

    setCompletedCards(
      completedList.map((show) => (
        <Card
          key={show.id}
          showData={show}
          watchingList={watchingList}
            wantToWatchList={wantToWatchList}
            completedList={completedList}
            droppedList={droppedList}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          setShowPage={setShowPage}
        />
      ))
    );

    setDroppedCards(
      droppedList.map((show) => (
        <Card
          key={show.id}
          showData={show}
          watchingList={watchingList}
            wantToWatchList={wantToWatchList}
            completedList={completedList}
            droppedList={droppedList}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          setShowPage={setShowPage}
        />
      ))
    );

    // localStorage.setDroppedList("droppedShowsList", JSON.stringify(droppedList));
  }, [
    popular,
    topRated,
    results,
    watchingList,
    wantToWatchList,
    completedList,
    droppedList,
    homePage,
  ]);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav
          getTopShows={getTopShows}
          getPopularShows={getPopularShows}
          searchTvShow={searchTvShow}
        />
        <Routes>
          <Route
            path="/"
            element={<Home setHomePage={setHomePage} topRatedCards={topRatedCards} popularCards={popularCards} />}
          />
          <Route
            path="/results"
            element={<Results resultCards={resultCards} />}
          />
          <Route path="/lists" element={
            <Lists           
              watchingList={watchingList}
              wantToWatchList={wantToWatchList}
              completedList={completedList}
              droppedList={droppedList}
            />
          }
          >
          </Route>
          <Route
            path="/lists/currently-watching"
            element={
              <ListPage
                listCards={watchingCards}
                title={"Currently Watching"}
              />
            }
          />
          <Route
            path="/lists/want-to-watch"
            element={
              <ListPage listCards={wantToWatchCards} title={"Want To Watch"} />
            }
          />
          <Route
            path="/lists/completed"
            element={
              <ListPage listCards={completedCards} title={"Completed Shows"} />
            }
          />
          <Route
            path="/lists/dropped"
            element={
              <ListPage listCards={droppedCards} title={"Dropped Shows"} />
            }
          />
          <Route
            path={`/shows/id:${showPage.id}`}
            element={
              <ShowPage
                id={showPage.id}
                setWatchingList={setWatchingList}
                setWantToWatchList={setWantToWatchList}
                setCompletedList={setCompletedList}
                setDroppedList={setDroppedList}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
