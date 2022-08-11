import React, { useState } from "react";

const Nav = (props) => {
  const {
    setHomeActive,
    setMyListActive,
    setResultsActive,
    homeTvShows,
    searchTvShow,
  } = props;
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleHome = () => {
    homeTvShows();
    setHomeActive(true);
    setMyListActive(false);
    setResultsActive(false);
  };

  const handleMyList = () => {
    setHomeActive(false);
    setMyListActive(true);
    setResultsActive(false);
  };

  const handleSearch = () => {
    searchTvShow(searchInput);
    setHomeActive(false);
    setMyListActive(false);
    setResultsActive(true);
  };

  return (
    <div className="Nav">
      <button onClick={handleHome} className="homeBtn">
        Home
      </button>
      <button onClick={handleMyList} className="myListBtn">
        My List
      </button>
      <label htmlFor="search">Search</label>
      <input
        onChange={handleSearchInput}
        id="search"
        type="text"
        value={searchInput}
      ></input>
      <button onClick={handleSearch} type="button">
        Find
      </button>
    </div>
  );
};

export default Nav;
