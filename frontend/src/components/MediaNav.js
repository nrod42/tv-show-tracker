import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const MediaNav = ({type}) => {
  const page = window.location.pathname.split(":")[0].split("/")[3];
  
  const navItems = [];

  if (type === "tv") {
    navItems.push(
        { key: "top-rated", path: `/tv/top-rated`, title: "Top Rated" },
        { key: "popular", path: `/tv/popular`, title: "Popular" },
        { key: "airing-today", path: `/tv/airing-today`, title: "Airing Today",
        }
    );
  } else if (type === "movie") {
    navItems.push(
        { key: "top-rated", path: `/movies/top-rated`, title: "Top Rated" },
        { key: "popular", path: `/movies/popular`, title: "Popular" },
        { key: "now-playing", path: `/movies/now-playing`,title: "Now Playing"},
        { key: "upcoming", path: `/movies/upcoming`, title: "Upcoming"
        }
    );
  }

  return (
    <Nav variant="pills" defaultActiveKey={page}>
      {navItems.map((item) => (
        <Nav.Item key={item.key}>
          <Nav.Link as={Link} to={`/tv-show-tracker${item.path}`} eventKey={item.key}>
            {item.title}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default MediaNav;