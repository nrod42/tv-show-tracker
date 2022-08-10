import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Card from "./components/Card";
import "./index.css";
import Results from "./components/Results";

const App = () => {
  // const [homeList, setHomeList] = useState([]);
  // const [myList, setMyList] = useState([]);

  const [results, setResults] = useState([]);
  const [resultCards, setResultCards] = useState([]);
  const [isResultsActive, setResultsActive] = useState(false);

  // const [isHomeActive, setHomeActive] = useState(true);
  // const [isMyListActive, setMyListActive] = useState(false);
  // const [isResultsActive, setResultsActive] = useState(true);

  const searchTvShow = async (value) => {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${value}`,
        { mode: "cors" }
      );
      const tvShows = await response.json();
      // return tvShows;
      setResults(tvShows);
      console.log(tvShows);
      // return tvShows.map((show) => (
      //   <Card key={show.show.id} showData={show.show} setMyList={setMyList} />
      // ));
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  useEffect(() => {
    setResultCards(
      results.map((show) => (
        <Card
          key={show.show.id}
          showData={show.show}
          // setMyList={setMyList}
        />
      ))
    );
  }, [results]);

  // const hompageTvShows = async () => {
  //   try {
  //     const response = await fetch("https://api.tvmaze.com/shows", {
  //       mode: "cors",
  //     });
  //     const tvShows = await response.json();
  //     console.log(tvShows);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div className="App">
      <Nav
        searchTvShow={searchTvShow}
        setResults={setResults}
        setResultsActive={setResultsActive}
      />
      <h1>Results:</h1>
      <Results resultCards={resultCards} isResultsActive={isResultsActive} />
    </div>
  );
};

export default App;
