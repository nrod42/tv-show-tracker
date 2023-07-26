import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import styles from "./MediaNav.module.css";
import { DarkModeContext } from "../DarkModeContext";

const MediaNav = ({ type }) => {
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();
  const page = location.pathname.split("/")[3];

  const tabs = [];

  if (type === "tv") {
    tabs.push(
      { key: "top-rated", path: "/tv/top-rated", title: "Top Rated" },
      { key: "popular", path: "/tv/popular", title: "Popular" },
      { key: "airing-today", path: "/tv/airing-today", title: "Airing Today" }
    );
  } else if (type === "movie") {
    tabs.push(
      { key: "top-rated", path: "/movies/top-rated", title: "Top Rated" },
      { key: "popular", path: "/movies/popular", title: "Popular" },
      { key: "now-playing", path: "/movies/now-playing", title: "Now Playing" },
      { key: "upcoming", path: "/movies/upcoming", title: "Upcoming" }
    );
  }
  const accentColor = "#198754";
  const getButtonStyle = (key) => {
    if (page === key) {
      return {
        backgroundColor: accentColor,
        border: accentColor,
        color: "#FFF",
        boxShadow: "none",
      };
    } else {
      return {
        backgroundColor: "transparent",
        // color: "black",
        color: accentColor,
        border: `1px solid ${accentColor}`,
        boxShadow: "none",
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

// import React, { useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import Button from "react-bootstrap/Button";
// import styles from "./MediaNav.module.css";
// import { DarkModeContext } from "../DarkModeContext";

// const MediaNav = ({ type }) => {
//   const { darkMode } = useContext(DarkModeContext);
//   const location = useLocation();
//   const page = location.pathname.split("/")[3];

//   const tabs = [];

//   if (type === "tv") {
//     tabs.push(
//       { key: "top-rated", path: "/tv/top-rated", title: "Top Rated" },
//       { key: "popular", path: "/tv/popular", title: "Popular" },
//       { key: "airing-today", path: "/tv/airing-today", title: "Airing Today" }
//     );
//   } else if (type === "movie") {
//     tabs.push(
//       { key: "top-rated", path: "/movies/top-rated", title: "Top Rated" },
//       { key: "popular", path: "/movies/popular", title: "Popular" },
//       { key: "now-playing", path: "/movies/now-playing", title: "Now Playing" },
//       { key: "upcoming", path: "/movies/upcoming", title: "Upcoming" }
//     );
//   }

//   return (
//     <ButtonGroup
//       className={darkMode ? styles.mediaNavDark : styles.mediaNavLight}
//     >
//       {tabs.map((item) => (
//         <Button
//           key={item.key}
//           as={Link}
//           to={`/tv-show-tracker${item.path}`}
//           variant={page === item.key ? "success" : "outline-success"}
//         >
//           {item.title}
//         </Button>
//       ))}
//     </ButtonGroup>
//   );
// };

// export default MediaNav;
