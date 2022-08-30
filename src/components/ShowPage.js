import { useEffect, useState } from "react";
import { getShowDetails, getShowCredits, getSimilarShows, getRecTV, getShowTrailer } from "./API/getTV";
import SeasonCard from "./SeasonCard";
import PersonCard from "./PersonCard";
import TvCard from "./TvCard";
import AddToListBtn from "./AddToListBtn";
import "./Styles/showPage.css";

const ShowPage = () => {
  const [showInfo, setShowInfo] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  // const [crew, setCrew] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [recShows, setRecShows] = useState([]);
  // const [isVideoOpen, setVideoOpen] = useState(false);
  // const [trailer, setTrailer] = useState("");

  const id = window.location.pathname.split(":")[1];

  //Fetch all relevant show info and saves them in a state
  useEffect(() => {
    (async () => {
      const showInfo = await getShowDetails(id);
      const credits = await getShowCredits(id);
      const similarShows = await getSimilarShows(id);
      const recShows = await getRecTV(id);
      // const trailer = await getShowTrailer(id)
      setShowInfo(showInfo);
      setSeasons(showInfo.seasonsInfo);
      setCast(credits.cast);
      // setCrew(credits.crew);
      setSimilarShows(similarShows);
      setRecShows(recShows);
      // setTrailer(trailer);
    })();
  }, [id])

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
          <div className="showPosterWrapper">
            <img src={showInfo.poster} alt={`${showInfo.title} poster`} />
            <AddToListBtn data={showInfo} />
            <div>
              <button 
              // onClick={() => setVideoOpen((prev) => !prev)}
              >
                Trailer
              </button>
            </div>
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

            <div className="plot">{showInfo.plot}</div>
          </div>
        </div>
        <div className="seasonWrapper">
          <h2>Seasons</h2>
          <div className="strip">
          {seasons.map((season) => <SeasonCard key={season.id} season={season} />)}
          </div>
        </div>
        <div className="castWrapper">
          <h2>Starring</h2>
          <div className="strip">
          {cast.map((person) => <PersonCard key={person.id} person={person} />)}
          </div>
        </div>
        <div className="similarShowsWrapper">
          <h2>Similar Shows</h2>
          <div className="strip">
            {similarShows.map((show) => <TvCard key={show.id} showData={show} />)}
          </div>
        </div>
        <div className="recShowsWrapper">
          <h2>Recommended Shows</h2>
          <div className="strip">
            {recShows.map((show) => <TvCard key={show.id} showData={show} />)}
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
