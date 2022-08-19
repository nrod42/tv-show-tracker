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
  const [home, setHome] = useState([]);
  const [homeCards, setHomeCards] = useState([]);
  const [homePage, setHomePage] = useState(1);

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

  const getTopRatedTvShows = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${homePage}`,
        { mode: "cors" }
      );
      const topRatedTv = await response.json();

      setHome(
        topRatedTv.results.map((show) => ({
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

  const searchTvShow = async (value) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1&query=${value}&include_adult=true`,
        { mode: "cors" }
      );
      const tvShows = await response.json();
      setResults(
        tvShows.results.map((show) => ({
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
    getTopRatedTvShows();
  }, [homePage]);

  useEffect(() => {
    setHomeCards(
      home.map((show) => (
        <Card
          key={show.id}
          showData={show}
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
    home,
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
          getTopRatedTvShows={getTopRatedTvShows}
          searchTvShow={searchTvShow}
        />
        <Routes>
          <Route
            path="/"
            element={<Home setHomePage={setHomePage} homeCards={homeCards} />}
          />
          <Route
            path="/results"
            element={<Results resultCards={resultCards} />}
          />
          <Route path="/lists" element={<Lists />}></Route>
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
                showPage={showPage}
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
