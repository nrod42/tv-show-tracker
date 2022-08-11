import React, { useState } from "react";
import homeIcon from "../img/home_icon.svg";
import searchIcon from "../img/search_icon.svg";

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
    <div className="nav">
      <div className="pageTabs">
        <button onClick={handleHome} className="homeBtn">
          <img src={homeIcon} alt="home button"></img>
        </button>
        <button onClick={handleMyList} className="myListBtn">
          My List
        </button>
      </div>
      <div className="searchSection">
        <label htmlFor="search">Search</label>
        <input
          onChange={handleSearchInput}
          id="search"
          type="text"
          value={searchInput}
          placeholder={"Search TV Show"}
        ></input>
        <button onClick={handleSearch} type="button" className="searchBtn">
          <img src={searchIcon} alt="search button"></img>
        </button>
      </div>
      <button>Profile</button>
    </div>
  );
};

export default Nav;
