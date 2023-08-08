import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getResults } from "../API/getMedia";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import searchIcon from "../../img/search_icon.svg";
import styles from "./NavSearchbar.module.css";
import NavSearchSuggestions from "./NavSearchSuggestions";

const NavSearchbar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null); // Create a ref for the input element
  const suggestionsRef = useRef(null); // Create a ref for the suggestions dropdown

  const handleInputChange = async (e) => {
    setSearchInput(e.target.value);
    const formattedQuery = searchInput.replace(" ", "-"); // Replace spaces with dashes

    // Fetch search suggestions from TMDB API
    try {
      const results = await getResults(formattedQuery);
      setSuggestions(results.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchInput === "") return;
    const formattedQuery = searchInput.replace(" ", "-"); // Replace spaces with dashes
    navigate(`/results/${encodeURIComponent(formattedQuery)}`);

    // Hide the suggestions
    setIsFocused(false);
    inputRef.current.blur();
  };

  const handleParentBlur = () => {
    // Delay the onBlur event to check if focus has moved to suggestions
    setTimeout(() => {
      // If the currently active element is not a child of the suggestions div, hide the suggestions
      if (!suggestionsRef.current.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 0);
  };

  return (
    <div
      className={styles.searchbarWrapper}
      onFocus={() => setIsFocused(true)}
      onBlur={() => handleParentBlur}
    >
      <Form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={`${styles.inputContainer} me-2`}>
          <Form.Control
            ref={inputRef}
            onChange={handleInputChange}
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchInput}
            className="me-2"
          />
          {isFocused && suggestions.length > 0 && (
            <NavSearchSuggestions
              ref={suggestionsRef}
              suggestions={suggestions}
              setIsFocused={setIsFocused}
            />
          )}
        </div>
        <Button variant="success" type="submit">
          <img src={searchIcon} style={{ width: "20px" }} alt="search" />
        </Button>
      </Form>
    </div>
  );
};

export default NavSearchbar;
