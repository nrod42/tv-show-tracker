import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavSearchSuggestions.module.css";

const NavSearchSuggestions = ({ suggestions, setIsFocused }) => {
  return (
    <ul className={styles.suggestionsDropdown} tabIndex={-1}>
      {/* Apply styling to the suggestions dropdown */}
      {suggestions.map((suggestion) => (
        <li key={suggestion.id}>
          <Link
            to={`/${suggestion.type}/${suggestion.id}`}
            onClick={() => setIsFocused(false)}
          >
            <div className="d-flex flex-row align-items-center justify-content-start gap-1">
              <div style={{ maxWidth: "60px" }}>
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
