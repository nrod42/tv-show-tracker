import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Card from "./components/Card";
import "./index.css";
import Results from "./components/Results";
import MyList from "./components/MyList";

const App = () => {
  // const [homeList, setHomeList] = useState([]);

  const [myList, setMyList] = useState([]);
  const [myListCards, setMyListCards] = useState([]);
  const [isMyListActive, setMyListActive] = useState(false);


  const [results, setResults] = useState([]);
  const [resultCards, setResultCards] = useState([]);
  const [isResultsActive, setResultsActive] = useState(false);

  // const [isHomeActive, setHomeActive] = useState(true);


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
    setResultCards(
      results.map((show) => (
        <Card
          key={show.show.id}
          showData={show.show}
          setMyList={setMyList}
        />
      ))
    );

    setMyListCards(
      myList.map((show) => (
        <Card
          key={show.id}
          showData={show}
          // setMyList={setMyList}
        />
      ))
    );
  }, [myList, results]);

  

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
        setMyListActive={setMyListActive}
        setResults={setResults}
        setResultsActive={setResultsActive}
      />
      <h1>Results:</h1>
      <MyList myListCards={myListCards} isMyListActive={isMyListActive} />
      <Results resultCards={resultCards} isResultsActive={isResultsActive} />
    </div>
  );
};

export default App;
