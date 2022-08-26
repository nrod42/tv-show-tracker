import { useState } from "react";
import { getTopTV, getPopularTV } from "./API/getTV";
import TvCard from "./TvCard";
import "./Styles/home.css";

const Home = () => {
  const [topTV, setTopTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);

  // Fetches first two pages of each categories' shows and saves them to a state
  (async () => {
    const top = [...(await getTopTV()), ...(await getTopTV(2))];
    const popular = [...(await getPopularTV()), ...(await getPopularTV(2))];
    setTopTV(top);
    setPopularTV(popular);
  })();

  // window.setInterval(function() {
  //   var elem = document.getElementById('data');
  //   elem.scrollTop = elem.scrollHeight;
  // }, 5000);

  return (
    <div className={"home"}>
      <div className="popularWrapper">
        <h1>Popular</h1>
        <div className="popularTVStrip">
          { popularTV.map((show) => <TvCard key={show.id} showData={show} />)}
        </div >
      </div>
      <div className="topRatedWrapper">
        <h1>Top Rated</h1>
        <div className="topTVStrip">
          {topTV.map((show) => <TvCard key={show.id} showData={show} />)}
        </div>
      </div>
    </div>
  );
};
export default Home;
