import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTopTV, getPopularTV, getTVResults } from "./API/getTV";

// import homeIcon from "../img/home_icon.svg";
import searchIcon from "../img/search_icon.svg";
import "./Styles/nav.css";

const Nav = (props) => {
  const { setTopRatedTV, setPopularTV, setResults } = props;

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleHome = () => {
    getTopTV(setTopRatedTV);
    getPopularTV(setPopularTV);
  };

  const handleSearch = () => {
    getTVResults(searchInput, setResults);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      getTVResults(searchInput, setResults); //Needs to know to switch route
    }
  };

  return (
    <nav className="nav">
      <ul className="pageTabs">
        <li>
          <Link to={"/"} onClick={handleHome} className="homeBtn">
            {/* <img src={homeIcon} alt="home button"></img> */}
            Home
          </Link>
        </li>
        <li>
          <Link to="/lists/" className="listsBtn">
            Lists
          </Link>
        </li>
        {/* <li>
          <Link to={"/movies"} className="Movies">
            <img src={homeIcon} alt="home button"></img>
            Movies
          </Link>
        </li> */}
        <li>
          <Link to={"/series"} className="Series">
            {/* <img src={homeIcon} alt="home button"></img> */}
            Series
          </Link>
        </li>
      </ul>
      <div className="searchSection">
        <label htmlFor="search">Search</label>
        <input
          onChange={handleSearchInput}
          onKeyDown={handleEnterKey}
          id="search"
          type="text"
          value={searchInput}
          placeholder={"Search TV Shows"}
        ></input>
        <Link to="/results" onClick={handleSearch} className="searchBtn">
          <img src={searchIcon} alt="search button"></img>
        </Link>
      </div>
      {/* <Link to="/profile">Profile</Link> */}
    </nav>
  );
};

export default Nav;
