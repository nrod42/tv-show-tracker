import React, { createContext, useState, useEffect } from "react";
import { getTopMedia, getPopularMedia } from "../components/API/getMedia.tsx";
import getMediaDetails from "../components/API/getMediaDetails.tsx";

const RandomBackdropContext = createContext({});
const RandomBackdropContextProvider = ({ children }) => {
  const [randomBackdrop, setRandomBackdrop] = useState("");

  const [topTV, setTopTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

// Fetch and set all of the media
  const fetchMedia = async (category, type) => {
    let media = category === 'top' ? await getTopMedia(type) : await getPopularMedia(type);
    let page = 1;
    while (media.length < 6) {
      page++;
      media = [...media, ...(category === 'top' ? await getTopMedia(type, page) : await getPopularMedia(type,page))];
    }
    return media;
  };

  // Fetches data for top TV shows, popular TV shows, top movies, and popular movies
  const fetchData = async () => {
    const topTVResult = await fetchMedia('top', "tv");
    const topMoviesResult = await fetchMedia('top', "movie");
    const popTVResult = await fetchMedia('pop', "tv");
    const popMoviesResult = await fetchMedia('pop', "movie");

    // Merge results of multiple API calls into respective state variables
    setTopTV([...topTVResult]);
    setPopularTV([...popTVResult]);
    setTopMovies([...topMoviesResult]);
    setPopularMovies([...popMoviesResult]);
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  // Fetches random media item from the combined list of top TV shows and top movies
  const fetchRandomMedia = async () => {
    const media = [...topTV, ...popularTV, ...topMovies, ...popularMovies]
    const randomIndex = Math.floor(Math.random() * media.length);
    const randomMedia = media[randomIndex] || [];

    // Fetch details of the random media item
    const randomDetails =
      randomMedia.type === "tv"
        ? await getMediaDetails(randomMedia.id, "tv")
        : await getMediaDetails(randomMedia.id, "movie");
    setRandomBackdrop(randomDetails);
  };

  useEffect(() => {
    fetchRandomMedia();
  }, [topTV, popularTV, topMovies, popularMovies]);

  const contextValue = {
    topTV,
    topMovies,
    popularMovies,
    popularTV,
    randomBackdrop,
    setRandomBackdrop,
  };

  return (
    <RandomBackdropContext.Provider
      value={contextValue}
    >
      {children}
    </RandomBackdropContext.Provider>
  );
};

export { RandomBackdropContext, RandomBackdropContextProvider };
