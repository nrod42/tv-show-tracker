import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import styles from './NavSearchbar.module.css';

const NavSearchbar = ({ searchInput, handleInputChange, handleSearch, suggestions }) => {
    return (
        <div className={styles.searchbarWrapper}>
            <Form onSubmit={handleSearch} className={styles.searchForm}>
                <Form.Control
                    onChange={handleInputChange}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchInput}
                />
                {suggestions.length > 0 && (
                    <ul className={styles.suggestionsDropdown}> {/* Apply styling to the suggestions dropdown */}
                        {suggestions.map((suggestion) => (
                            <li key={suggestion.id}>
                                <Link to={`/${suggestion.type}/${suggestion.id}`}>
                                    <div
                                    className="d-flex flex-row align-items-center justify-content-start gap-1"
                                    >
                                        <div style={{maxWidth: "60px"}}>
                                            <img src={suggestion.poster} style={{height: '100%', width: "100%", objectFit: "cover"}}></img>
                                        </div>
                                        <div><div>{suggestion.title} ({suggestion.year}) {suggestion.type.toUpperCase()}</div></div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <Button variant="success" type="submit">
                    Search
                </Button>
            </Form>
        </div>
    )
}


export default NavSearchbar;