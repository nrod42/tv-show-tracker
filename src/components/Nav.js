import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTVResults } from "./API/getTV";

// import homeIcon from "../img/home_icon.svg";
import searchIcon from "../img/search_icon.svg";
import "./Styles/nav.css";

const Nav = (props) => {
  const { setResults } = props;
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/results");
    getTVResults(searchInput, setResults);
  };

  // const handleEnterKey = (e) => {
  //   if (e.key === "Enter") {
  //     getTVResults(searchInput, setResults); //Needs to know to switch route
  //   }
  // };

  return (
    <nav className="nav">
      <ul className="pageTabs">
        <li>
          <Link to={"/"} className="homeBtn">
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
          <Link to={"/movies"} className="moviesBtn">
            Movies
          </Link>
        </li> */}
        <li>
          <Link to={"/series/top-rated"} className="seriesBtn">
            Series
          </Link>
        </li>
      </ul>
      <div className="searchSection">
        <form onSubmit={handleSearch} action="">
          <label htmlFor="search">Search</label>
          <input
            onChange={handleSearchInput}
            id="search"
            type="text"
            value={searchInput}
            placeholder={"Search TV Shows"}
          ></input>
          <button type="submit">
            <Link to="/results" className="searchBtn">
              <img src={searchIcon} alt="search button"></img>
            </Link>
          </button>
        </form>
      </div>
      {/* <Link to="/profile">Profile</Link> */}
    </nav>
  );
};

export default Nav;
