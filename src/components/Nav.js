import React, { useState } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../img/home_icon.svg";
import searchIcon from "../img/search_icon.svg";

const Nav = (props) => {
  const { homeTvShows, searchTvShow } = props;

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleHome = () => {
    homeTvShows();
  };

  const handleSearch = () => {
    searchTvShow(searchInput);
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      searchTvShow(searchInput); //Needs to know to switch route
    }
  }

  return (
    <nav className="nav">
      <div className="pageTabs">
        <Link to={"/"} onClick={handleHome} className="homeBtn">
          <img src={homeIcon} alt="home button"></img>Home
        </Link>
        <Link to="/my-list" className="myListBtn">
          My List
        </Link>
      </div>
      <div className="searchSection">
        <label htmlFor="search">Search</label>
        <input
          onChange={handleSearchInput}
          onKeyDown={handleEnterKey}
          id="search"
          type="text"
          value={searchInput}
          placeholder={"Search TV Show"}
        ></input>
        <Link to="/results" onClick={handleSearch} className="searchBtn">
          <img src={searchIcon} alt="search button"></img>
        </Link>
      </div>
      <Link to="/profile">Profile</Link>
    </nav>
  );
};

export default Nav;
