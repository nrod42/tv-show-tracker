import { useState } from "react";
import { getShowDetails, getShowCredits, getSimilarShows, getShowTrailer } from "./API/getTV";
import SeasonCard from "./SeasonCard";
import PersonCard from "./PersonCard";
import TvCard from "./TvCard";
import AddToListBtn from "./AddToListBtn";
import RemoveFromListBtn from "./RemoveFromListBtn";
import "./Styles/showPage.css";

const ShowPage = () => {
  const [showInfo, setShowInfo] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  // const [crew, setCrew] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  // const [isVideoOpen, setVideoOpen] = useState(false);
  // const [trailer, setTrailer] = useState("");

  const id = window.location.pathname.split(":")[1];

  //Fetch all relevant show info and saves them in a state
  (async () => {
    const showInfo = await getShowDetails(id);
    const credits = await getShowCredits(id);
    const similarShows = await getSimilarShows(id);
    // const trailer = await getShowTrailer(id)
    setShowInfo(showInfo);
    setSeasons(showInfo.seasonsInfo);
    setCast(credits.cast);
    // setCrew(credits.crew);
    setSimilarShows(similarShows);
    // setTrailer(trailer);
  })();

  return (
    <div className="showPage">
      <div className="backdrop">
        <img
          className={"backdropImg"}
          src={showInfo.backdrop}
          alt={`${showInfo.title} backdrop`}
        />
      </div>
      <div className="allShowInfo">
        <div className="showInfoContainer">
          <div className="posterWrapper">
            <img src={showInfo.poster} alt={`${showInfo.title} poster`} />
            <AddToListBtn showData={showInfo} />
            <RemoveFromListBtn showData={showInfo} />
          </div>
          <div className="showInfo">
            <div className="titleSection">
              <p>{showInfo.title}</p>
              <p>({showInfo.year})</p>
            </div>
            <div className="seasonSection">
              <p>Seasons: {showInfo.seasonNum}</p>
              <p>Episodes: {showInfo.episodeNum}</p>
            </div>
            <p>Genres: {showInfo.genres}</p>
            <p>Rating: {showInfo.rating}</p>
            {/* <p>Crew: {crew.map((actor) => actor.name)}</p> */}
            <div>
        
              <button 
              // onClick={() => setVideoOpen((prev) => !prev)}
              >
                Trailer
              </button>
            </div>
            <div className="plot">{showInfo.plot}</div>
          </div>
        </div>
        <div className="seasonWrapper">
          <h2>Seasons</h2>
          <div className="seasonStrip">
          {seasons.map((season) => <SeasonCard key={season.id} season={season} />)}
          </div>
        </div>
        <div className="castWrapper">
          <h2>Starring</h2>
          <div className="castStrip">
          {cast.map((person) => <PersonCard key={person.id} person={person} />)}
          </div>
        </div>
        <div className="similarShowsWrapper">
          <h2>Similar Shows</h2>
          <div className="similarShowsStrip">
            {similarShows.map((show) => <TvCard key={show.id} showData={show} />)}
          </div>
        </div>
        {/* <div className={isVideoOpen ? "trailerContainer" : "hiddenTrailer"}>
          <iframe
            className="trailer"
            title="Youtube player"
            allowFullScreen="allowfullscreen"
            src={`https://youtube.com/embed/${trailer}?autoplay=0`}
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default ShowPage;
