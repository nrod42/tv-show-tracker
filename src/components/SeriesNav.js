import { Link } from "react-router-dom";
import "./Styles/seriesNav.css";

const SeriesNav = () => {
  return (
    <div className="seriesNav">
      <ul className="seriesTabs">
        <li>
          <Link to="/series/top-rated" className="topTVBtn">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/series/popular" className="popularTVBtn">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/series/airing-today" className="latestTVBtn">
            Airing Today
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SeriesNav;
