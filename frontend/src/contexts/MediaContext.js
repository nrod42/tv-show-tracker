import React, { createContext, useState } from "react";

const MediaContext = createContext({});
const MediaContextProvider = ({ children }) => {
  const [media, setMedia] = useState({
    topMovies: [],
    popMovies: [],
    upcoming: [],
    "now-playing": [],
    topTV: [],
    popTV: [],
    "airing-today": [],
  });

  // Function to update media data for a specific page of a category
  const updateMediaData = (category, page, newData) => {
    setMedia((prevMedia) => {
      // Check if the page data already exists, and only update if not
      const categoryData = prevMedia[category];
      const existingPageData = categoryData.find((item) => item.pageNum === page);

      if (!existingPageData) {
        categoryData.push({ pageNum: page, mediaData: newData });
      }

      return { ...prevMedia, [category]: categoryData };
    });
    console.log(media)
  };

  return (
    <MediaContext.Provider value={{ media, updateMediaData }}>
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaContextProvider };
