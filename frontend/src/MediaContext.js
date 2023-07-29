import React, { createContext, useState, useEffect } from "react";
import { getTopMedia, getPopularMedia, getMediaDetails } from "./components/API/getMedia";

const MediaContext = createContext({});
const MediaContextProvider = ({ children }) => {
    const [topTV, setTopTV] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [randomBackdrop, setRandomBackdrop] = useState("");

    // Fetches data for top TV shows, popular TV shows, top movies, and popular movies
    const fetchData = async () => {
        const [
          topTVResult,
          popTVResult,
          topMoviesResult,
          popMoviesResult,
        ] = await Promise.all([
          getTopMedia("tv"),
          getPopularMedia("tv"),
          getTopMedia("movie"),
          getPopularMedia("movie"),
        ]);
    
        // Merge results of multiple API calls into respective state variables
        setTopTV([...topTVResult]);
        setPopularTV([...popTVResult]);
        setTopMovies([...topMoviesResult]);
        setPopularMovies([...popMoviesResult]);
    };

      // Fetches random media item from the combined list of top TV shows and top movies
    const fetchRandomMedia = async () => {
        const topMedia = [...topTV, ...topMovies];
        const randomIndex = Math.floor(Math.random() * topMedia.length);
        const randomTopMedia = topMedia[randomIndex] || [];

        // Fetch details of the random media item
        const randomDetails =
        randomTopMedia.type === "tv"
            ? await getMediaDetails(randomTopMedia.id, "tv")
            : await getMediaDetails(randomTopMedia.id, "movie");
        setRandomBackdrop(randomDetails);
    };

    useEffect(() => {
        // Fetch data on component mount
        fetchData();
      }, []);
    
      useEffect(() => {
        // Fetch random media when topTV state updates
        fetchRandomMedia();
      }, [topTV]);



  return (
    <MediaContext.Provider value={{ topTV, popularTV, topMovies, popularMovies, randomBackdrop }}>
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaContextProvider };
