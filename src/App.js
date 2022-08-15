import "./index.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Results from "./components/Results";
import MyList from "./components/MyList";
import Home from "./components/Home";
import Footer from "./components/Footer";

const App = () => {
  const [home, setHome] = useState([]);
  const [homeCards, setHomeCards] = useState([]);

  const [myList, setMyList] = useState([]);
  const [myListCards, setMyListCards] = useState([]);

  const [results, setResults] = useState([]);
  const [resultCards, setResultCards] = useState([]);

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

  const homeTvShows = async () => {
    try {
      const response = await fetch("https://api.tvmaze.com/shows", {
        mode: "cors",
      });
      const tvShows = await response.json();
      setHome(
        tvShows.sort(
          (show1, show2) => show2.rating.average - show1.rating.average
        )
      );
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  useEffect(() => {
    setResultCards(
      results.map((show) => (
        <Card key={show.show.id} showData={show.show} setMyList={setMyList} />
      ))
    );

    setMyListCards(
      myList.map((show) => (
        <Card
          key={show.id}
          showData={show}
          setMyList={setMyList}
        />
      ))
    );

    setHomeCards(
      home.map((show) => (
        <Card key={show.id} showData={show} setMyList={setMyList} />
      ))
    );

    // localStorage.setItem('myShows', JSON.stringify(myList));

  }, [home, myList, results ]);

  // useEffect(() => {
  //   const myShows = JSON.parse(localStorage.getItem('myShows'));
    
  //   if (myShows) {
  //     setMyListCards(
  //       myShows.map((show) => (
  //         <Card
  //           key={show.id}
  //           showData={show}
  //           setMyList={setMyList}
  //           isMyListActive={isMyListActive}
  //         />
  //       ))
  //     );
  //   }
  // })

  // homeTvShows();

  return (
    <BrowserRouter>
      <div className="App">
        <Nav homeTvShows={homeTvShows} searchTvShow={searchTvShow} />
        <Routes>
          <Route path="/" element={ <Home homeCards={homeCards} />} />
          <Route path="/my-list" element={ <MyList myListCards={myListCards} />} />
          <Route path="/results" element={ <Results resultCards={resultCards} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
