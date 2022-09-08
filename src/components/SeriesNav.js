import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const SeriesNav = () => {
  const page = window.location.pathname.split(":")[0].split('/')[3];
    
  return (
  <Nav variant="pills" defaultActiveKey={page}>
    <Nav.Item>
      <Nav.Link as={Link} to="/tv-show-tracker/series/top-rated" eventKey="top-rated">Top Rated</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/tv-show-tracker/series/popular" eventKey="popular">Popular</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/tv-show-tracker/series/airing-today" eventKey="airing-today">
        Airing Today
      </Nav.Link>
    </Nav.Item>
  </Nav>
  )
};

export default SeriesNav;
