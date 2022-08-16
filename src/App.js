import "./index.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Results from "./components/Results";
import ListPage from "./components/ListPage";
import Card from "./components/Card";
import Footer from "./components/Footer";

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

  const homeTvShows = async () => {
    try {
      const response = await fetch("https://api.tvmaze.com/shows", {
        mode: "cors",
      });
      const tvShows = await response.json();
      console.log(tvShows);
      setHome(
        tvShows.sort(
          (show1, show2) => show2.rating.average - show1.rating.average
        )
      );
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  const searchTvShow = async (value) => {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${value}`,
        { mode: "cors" }
      );
      const tvShows = await response.json();
      setResults(tvShows);
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
        />
      ))
    );

    setResultCards(
      results.map((show) => (
        <Card
          key={show.show.id}
          showData={show.show}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
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
        />
      ))
    );

    // localStorage.setItem('myShows', JSON.stringify(ListPage));
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
    homeTvShows();
  }, [])

  // homeTvShows();

  return (
    <BrowserRouter>
      <div className="App">
        <Nav homeTvShows={homeTvShows} searchTvShow={searchTvShow} />
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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
