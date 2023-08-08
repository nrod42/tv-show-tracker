import React, { createContext, useState, useEffect } from "react";
import { getMediaDetails } from "../components/API/getMedia";

const RandomBackdropContext = createContext({});
const RandomBackdropContextProvider = ({ children }) => {
  const [randomBackdrop, setRandomBackdrop] = useState("");
  const [media, setMedia] = useState([]);
  
  // Fetches random media item from the combined list of top TV shows and top movies
  const fetchRandomMedia = async () => {
    
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
  }, [media]);

  return (
    <RandomBackdropContext.Provider
      value={{ randomBackdrop, setRandomBackdrop, setMedia }}
    >
      {children}
    </RandomBackdropContext.Provider>
  );
};

export { RandomBackdropContext, RandomBackdropContextProvider };
