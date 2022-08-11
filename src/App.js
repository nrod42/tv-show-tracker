import "./index.css";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Results from "./components/Results";
import MyList from "./components/MyList";
import Home from "./components/Home";
import Footer from "./components/Footer";

const App = () => {
  const [home, setHome] = useState([]);
  const [homeCards, setHomeCards] = useState([]);
  const [isHomeActive, setHomeActive] = useState(true);

  const [myList, setMyList] = useState([]);
  const [myListCards, setMyListCards] = useState([]);
  const [isMyListActive, setMyListActive] = useState(false);

  const [results, setResults] = useState([]);
  const [resultCards, setResultCards] = useState([]);
  const [isResultsActive, setResultsActive] = useState(false);

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
      console.error("Error:", error);
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
          isMyListActive={isMyListActive}
        />
      ))
    );

    setHomeCards(
      home.map((show) => (
        <Card key={show.id} showData={show} setMyList={setMyList} />
      ))
    );
  }, [home, myList, results, isMyListActive]);

  return (
    <div className="App">
      <Nav
        homeTvShows={homeTvShows}
        searchTvShow={searchTvShow}
        setHomeActive={setHomeActive}
        setMyListActive={setMyListActive}
        setResultsActive={setResultsActive}
      />
      <Home homeCards={homeCards} isHomeActive={isHomeActive} />
      <MyList myListCards={myListCards} isMyListActive={isMyListActive} />
      <Results resultCards={resultCards} isResultsActive={isResultsActive} />
      <Footer />
    </div>
  );
};

export default App;
