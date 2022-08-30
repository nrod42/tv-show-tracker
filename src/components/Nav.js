import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import homeIcon from "../img/home_icon.svg";
import searchIcon from "../img/search_icon.svg";
import "./Styles/nav.css";

const Nav = (props) => {
  const { setSearchQuery } = props;
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/results");
    setSearchQuery(searchInput);
  };

  return (
    <nav className="nav">
      <div className="navTabs">
        <ul className="pageTabs">
          <li>
            <Link to={"/tv-show-tracker"} className="homeBtn">
              Home
            </Link>
          </li>
          <li>
            <Link to="/lists/" className="listsBtn">
              Lists
            </Link>
          </li>
          <li>
            <Link to={"/movies/top-rated"} className="moviesBtn">
              Movies
            </Link>
          </li>
          <li>
            <Link to={"/series/top-rated"} className="seriesBtn">
              Series
            </Link>
          </li>
        </ul>
      </div>
      <div className="searchSection">
        <form onSubmit={handleSearch} role="search">
          <input
            onChange={handleSearchInput}
            id="search"
            type="text"
            value={searchInput}
            placeholder={"Search TV Shows"}
            aria-label="Search"
          ></input>
          <button onClick={handleSearch} type="submit">
              <img src={searchIcon} alt="search button"></img>
          </button>
        </form>
      </div>
      {/* <Link to="/profile">Profile</Link> */}
    </nav>
  );
};

export default Nav;
