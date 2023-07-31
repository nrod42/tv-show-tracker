import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import styles from "./MediaNav.module.css";
import { DarkModeContext } from "../DarkModeContext";

const MediaNav = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { mediaType, category } = useParams();

  const tabs = [];

  if (mediaType === "tv") {
    tabs.push(
      { key: "top-rated", path: "/tv/category/top-rated", title: "Top Rated" },
      { key: "popular", path: "/tv/category/popular", title: "Popular" },
      { key: "airing-today", path: "/tv/category/airing-today", title: "Airing Today" }
    );
  } else if (mediaType === "movie") {
    tabs.push(
      { key: "top-rated", path: "/movie/category/top-rated", title: "Top Rated" },
      { key: "popular", path: "/movie/category/popular", title: "Popular" },
      { key: "now-playing", path: "/movie/category/now-playing", title: "Now Playing" },
      { key: "upcoming", path: "/movie/category/upcoming", title: "Upcoming" }
    );
  }
  const accentColor = "#198754";
  const getButtonStyle = (key) => {
    if (category === key) {
      return {
        backgroundColor: accentColor,
        border: accentColor,
        color: "#FFF",
        boxShadow: "none",
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    } else {
      return {
        backgroundColor: "transparent",
        // color: "black",
        color: accentColor,
        border: `1px solid ${accentColor}`,
        boxShadow: "none",
        fontSize: '0.8rem',
      };
    }
  };

  return (
    <ButtonGroup
      className={darkMode ? styles.mediaNavDark : styles.mediaNavLight}
    >
      {tabs.map((item) => (
        <Button
          key={item.key}
          as={Link}
          to={`/tv-show-tracker${item.path}`}
          style={getButtonStyle(item.key)}
        >
          {item.title}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default MediaNav;