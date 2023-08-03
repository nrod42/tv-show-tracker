import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getResults } from "../API/getMedia";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import searchIcon from "../../img/search_icon.svg";
import styles from "./NavSearchbar.module.css";

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

    // Fetch search suggestions from your API
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
      onBlur={handleParentBlur}
    >
      <Form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputContainer}>
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
            <ul
              className={styles.suggestionsDropdown}
              ref={suggestionsRef}
              tabIndex={-1} // Make suggestions focusable
            >
              {/* Apply styling to the suggestions dropdown */}
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <Link
                    to={`/${suggestion.type}/${suggestion.id}`}
                    onClick={() => setIsFocused(false)} // Close suggestions on link click
                  >
                    <div className="d-flex flex-row align-items-center justify-content-start gap-1">
                      <div style={{ maxWidth: "60px" }}>
                        <img
                          src={suggestion.poster}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        ></img>
                      </div>
                      <div>
                        <div>
                          {suggestion.title} ({suggestion.year}){" "}
                          {suggestion.type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button variant="success" type="submit">
          <img src={searchIcon} style={{ width: "20px" }} alt="Search" />
        </Button>
      </Form>
    </div>
  );
};

export default NavSearchbar;
