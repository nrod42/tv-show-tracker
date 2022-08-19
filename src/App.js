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

const App = () => {
  const [home, setHome] = useState([]);
  const [homeCards, setHomeCards] = useState([]);

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
        "https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=2",
        {mode: "cors"}
      );

      const topRatedTv = await response.json();

      const topTvShows = topRatedTv.results.map((show) => ({ id: show.id, poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`, title: show.name, year: show.first_air_date, rating: show.vote_average}))
      console.log(topTvShows)
      setHome(topTvShows);
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  const searchTvShow = async (value) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=e746e10c&s=${value}&plot=full`,
        { mode: "cors" }
      );
      const tvShows = await response.json();
      const searchResults = tvShows.Search.map((show) => ({ id: show.imdbID, poster: show.Poster, title: show.Title, year: show.Year, rating: show.imdbRating}))
      setResults(searchResults); //instead of making array of objects, just make array of id's, then for each card, call the api and get the relevant info from the show poge which has much more info
      
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  const getTvShow = async (showId) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=e746e10c&i=${showId}&plot=full`,
        {
          mode: "cors",
        }
      );
      const tvShow = await response.json();
      const show = { id: tvShow.imdbID, poster: tvShow.Poster, title: tvShow.Title, rating: tvShow.imdbRating, actors:tvShow.Actors, plot:tvShow.Plot, year:tvShow.Year }
      setShowPage(show);
    } catch (error) {
      console.error("Error:API", error);
    }
  };

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
          getTvShow={getTvShow}

        />
      ))
    );

    setResultCards(
      results.map((show) => (
        <Card
          key={show.id}
          showData={show}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          getTvShow={getTvShow}

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
          getTvShow={getTvShow}

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
          getTvShow={getTvShow}

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
          getTvShow={getTvShow}

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
          getTvShow={getTvShow}
          
          
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
  ]);

  // useEffect(() => {
  //   const myShows = JSON.parse(localStorage.getItem('myShows'));

  //   if (myShows) {
  //     setListPageCards(
  //       myShows.map((show) => (
  //         <Card
  //           key={show.id}
  //           showData={show}
  //           setListPage={setListPage}
  //           isListPageActive={isListPageActive}
  //         />
  //       ))
  //     );
  //   }
  // })

  useEffect(() => {
    getTopRatedTvShows();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav getTopRatedTvShows={getTopRatedTvShows} searchTvShow={searchTvShow} />
        <Routes>
          <Route path="/" element={<Home homeCards={homeCards} />} />
          <Route
            path="/results"
            element={<Results resultCards={resultCards} />}
          />
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
              showInfo={showPage}
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
