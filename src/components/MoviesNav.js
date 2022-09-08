import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const MoviesNav = () => {
  const page = window.location.pathname.split(":")[0].split('/')[3];


  return (
    <Nav variant="pills" defaultActiveKey={page}>
      <Nav.Item>
        <Nav.Link as={Link} to="/tv-show-tracker/movies/top-rated" eventKey="top-rated">Top Rated</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/tv-show-tracker/movies/popular" eventKey="popular">Popular</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link  as={Link} to="/tv-show-tracker/movies/upcoming" eventKey="upcoming">
          Upcoming
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link  as={Link} to="/tv-show-tracker/movies/now-playing" eventKey="now-playing">
          Now Playing
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
};

export default MoviesNav;
