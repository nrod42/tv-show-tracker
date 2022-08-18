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
  

  const homeTvShows = async () => {
    try {
      const response = await fetch(
        // "https://imdb-api.com/en/API/MostPopularTVs/k_cham8dk3",
        {
          mode: "cors",
        }
      );
      const tvShows = await response.json();
      // console.log(tvShows);
      setHome(tvShows.items);
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  const searchTvShow = async (value) => {
    try {
      const response = await fetch(
        // `https://imdb-api.com/en/API/SearchSeries/k_cham8dk3/${value}`,
        `https://www.omdbapi.com/?apikey=e746e10c&s=${value}&plot=full`,
        { mode: "cors" }
      );
      const tvShows = await response.json();
      // console.log(tvShows.Search);
      setResults(tvShows.Search); //instead of making array of objects, just make array of id's, then for each card, call the api and get the relevant info from the show poge which has much more info
      //to make things etter, we can make the state objects custom, grabbing everything we need, that way, all the componenets only need to ref the same custom made object
      //... properties. THen, if we ever change api or use multiple different api's, we only have to edit the custom obj made here in this function 
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  const getTvShow = async (showId) => {
    try {
      const response = await fetch(
        // `https://imdb-api.com/en/API/Title/k_cham8dk3/${showId}/Ratings`,
        `https://www.omdbapi.com/?apikey=e746e10c&i=${showId}&plot=full`,
        {
          mode: "cors",
        }
      );
      const tvShow = await response.json();
      // console.log(tvShow);
      setShowPage(tvShow);
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
          // setShowPageId={setShowPageId}
          getTvShow={getTvShow}

        />
      ))
    );

    setResultCards(
      results.map((show) => (
        <Card
          key={show.imdbID}
          showData={show}
          setWatchingList={setWatchingList}
          setWantToWatchList={setWantToWatchList}
          setCompletedList={setCompletedList}
          setDroppedList={setDroppedList}
          // setShowPageId={setShowPageId}
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
          // setShowPageId={setShowPageId}
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
          // setShowPageId={setShowPageId}
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
          // setShowPageId={setShowPageId}
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
          // setShowPageId={setShowPageId}
          getTvShow={getTvShow}
          
          
        />
      ))
    );

    // localStorage.setDroppedList("droppedShowsList", JSON.stringify(droppedList));
    // console.log(showPage)
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
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav homeTvShows={homeTvShows} searchTvShow={searchTvShow} />
        {/* <Nav></Nav> */}
        <Routes>
          <Route path="/" element={<Home homeCards={homeCards} />} />
          <Route
            path="/results"
            element={<Results resultCards={resultCards} />}
          />
          {/* <Nav></Nav> */}
          {/* <Route path="/lists" element={<ListTabPage />} /> */}
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
            path={`/shows/id:${showPage.imdbID}`}
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
