import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import getResults from "../API/getResults.tsx";
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
  const [hideSuggestionsTimeout, setHideSuggestionsTimeout] = useState(null);

  const inputRef = useRef(null); // Create a ref for the input element
  const suggestionRef = useRef(null);

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

  const handleBlur = () => {
    const timeout = setTimeout(() => {
      setIsFocused(false);
      setHideSuggestionsTimeout(null);
    }, 100); // Set an appropriate delay in milliseconds
    setHideSuggestionsTimeout(timeout);
  };

  const handleFocus = () => {
    if (hideSuggestionsTimeout) {
      clearTimeout(hideSuggestionsTimeout);
      setHideSuggestionsTimeout(null);
    }
    setIsFocused(true);
  };

  // Escape keeps removes focus and hides suggestions
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        inputRef.current.blur();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={styles.searchbarWrapper}
      onFocus={handleFocus}
      onBlur={handleBlur}
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
            <div ref={suggestionRef}>
              <NavSearchSuggestions
                suggestions={suggestions}
                setIsFocused={setIsFocused}
              />
            </div>
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
