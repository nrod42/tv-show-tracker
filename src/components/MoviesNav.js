import { Link } from "react-router-dom";
import "./Styles/CategoryNav.css";

const MoviesNav = () => {
  return (
    <div className="categoryNav">
      <ul className="categoryTabs">
        <li>
          <Link to="/tv-show-tracker/movies/top-rated" className="categoryBtn">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/tv-show-tracker/movies/popular" className="categoryBtn">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/tv-show-tracker/movies/upcoming" className="categoryBtn">
            Upcoming
          </Link>
        </li>
        <li>
          <Link
            to="/tv-show-tracker/movies/now-playing"
            className="categoryBtn"
          >
            Now Playing
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MoviesNav;
