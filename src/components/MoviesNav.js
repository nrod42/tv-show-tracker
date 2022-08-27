import { Link } from "react-router-dom";
import "./Styles/CategoryNav.css";

const MoviesNav = () => {
  return (
    <div className="categoryNav">
      <ul className="categoryTabs">
        <li>
          <Link to="/movies/top-rated" className="categoryBtn">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/movies/popular" className="categoryBtn">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/movies/upcoming" className="categoryBtn">
            Upcoming
          </Link>
        </li>
        <li>
          <Link to="/movies/now-playing" className="categoryBtn">
            Now Playing
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MoviesNav;
