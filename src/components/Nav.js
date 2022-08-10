import React, { useState } from "react";

const Nav = (props) => {
  const { setMyListActive, setResultsActive, searchTvShow } = props;
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    searchTvShow(searchInput);
    setMyListActive(false); 
    setResultsActive(true);
  };

  const handleMyList = () => {
    setMyListActive(true); 
    setResultsActive(false);
  }

  return (
    <div className="Nav">
      <button className="homeBtn">Home</button>
      <button onClick={handleMyList} className="myListBtn">My List</button>
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
