import { Link } from "react-router-dom";
import "./Styles/CategoryNav.css";

const SeriesNav = () => {
  return (
    <div className="categoryNav">
      <ul className="categoryTabs">
        <li>
          <Link to="/series/top-rated" className="categoryBtn">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/series/popular" className="categoryBtn">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/series/airing-today" className="categoryBtn">
            Airing Today
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SeriesNav;
