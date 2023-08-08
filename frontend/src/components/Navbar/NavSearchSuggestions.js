import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavSearchSuggestions.module.css";

const NavSearchSuggestions = ({ suggestions, setIsFocused }) => {
  return (
    <ul className={styles.suggestionsDropdown} tabIndex={-1}>
      {/* Iterate through the suggestions and create a list item for each */}
      {suggestions.map((suggestion) => (
        <li key={suggestion.id}>
          {/* Create a link to the suggestion's detail page */}
          <Link
            to={`/${suggestion.type}/${suggestion.id}`}
            onClick={() => setIsFocused(false)} // Hide suggestions when a suggestion is clicked
          >
            {/* Display suggestion details with poster, title, year, and media type */}
            <div className="d-flex flex-row align-items-center justify-content-start gap-1">
              <div style={{ maxWidth: "60px" }}>
                {/* Display suggestion poster with proper styling */}
                <img
                  src={suggestion.poster}
                  alt={`${suggestion.title} poster`}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <div>
                  {/* Display suggestion title, year, and media type */}
                  {suggestion.title} ({suggestion.year}){" "}
                  {suggestion.type.toUpperCase()}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavSearchSuggestions;
