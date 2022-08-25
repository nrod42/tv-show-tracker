import { useState, useEffect } from "react";
import { getShowDetails, getShowCredits, getShowTrailer } from "./API/getTV";
import AddToListBtn from "./AddToListBtn";
import SeasonCard from "./SeasonCard";
import PersonCard from "./PersonCard";
import RemoveFromListBtn from "./RemoveFromListBtn";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Styles/showPage.css";

const ShowPage = () => {
  const [showInfo, setShowInfo] = useState("");
  const [isVideoOpen, setVideoOpen] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [seasonCards, setSeasonCards] = useState([]);
  const [cast, setCast] = useState([]);
  const [castCards, setCastCards] = useState([]);
  // const [crew, setCrew] = useState([]);

  const id = window.location.pathname.split(":")[1];

  const {
    title,
    backdrop,
    poster,
    rating,
    seasonNum,
    episodeNum,
    genres,
    plot,
    year,
  } = showInfo;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleShowInfo = async () => {
    const showInfo = await getShowDetails(id);
    setShowInfo(showInfo);
    setSeasons(showInfo.seasonsInfo);
  };

  const handleCredits = async () => {
    const credits = await getShowCredits(id);
    setCast(credits.cast);
    // setCrew(credits.crew);
  };

  const handleTrailer = async () => {
    const trailer = await getShowTrailer(id);
    setTrailer(trailer);
  };

  useEffect(() => {
    handleShowInfo();
    handleCredits();
    handleTrailer();
  });

  useEffect(() => {
    setSeasonCards(
      seasons.map((season) => <SeasonCard key={season.id} season={season} />)
    );

    setCastCards(
      cast.map((person) => <PersonCard key={person.id} person={person} />)
    );
  }, [seasons, cast]);

  return (
    <div className="showPage">
      <div className="backdrop">
        <img
          className={"backdropImg"}
          src={backdrop}
          alt={`${title} backdrop`}
        />
      </div>
      <div className="showInfoContainer">
        <div className="posterWrapper">
          <img src={poster} alt={`${title} poster`} />
          <AddToListBtn showData={showInfo} />
          <RemoveFromListBtn showData={showInfo} />
        </div>
        <div className="showInfo">
          <div>
            <h2>{title}</h2>
            <p>({year})</p>
          </div>
          <p>Genres: {genres}</p>
          <div>
            <p>Seasons: {seasonNum}</p>
            <p>Episodes: {episodeNum}</p>
          </div>
          <p>Rating: {rating}</p>
          {/* <p>Crew: {crew.map((actor) => actor.name)}</p> */}
          <p>{plot}</p>
          <div>
            <button onClick={() => setVideoOpen((prev) => !prev)}>
              Trailer
            </button>
          </div>
        </div>
      </div>
      <h2>Seasons</h2>
      <Carousel
        containerClass="carousel-container"
        responsive={responsive}
        swipeable={true}
        draggable={true}
      >
        {seasonCards}
      </Carousel>
      <h2>Starring</h2>
      <Carousel
        containerClass="carousel-container"
        responsive={responsive}
        swipeable={true}
        draggable={true}
      >
        {castCards}
      </Carousel>

      <div className={isVideoOpen ? "trailerContainer" : "hiddenTrailer"}>
        <iframe
          className="trailer"
          title="Youtube player"
          allowFullScreen="allowfullscreen"
          src={`https://youtube.com/embed/${trailer}?autoplay=0`}
        ></iframe>
      </div>
    </div>
  );
};

export default ShowPage;
