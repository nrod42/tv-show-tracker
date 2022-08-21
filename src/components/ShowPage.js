import { useEffect, useState } from "react";
import AddToListBtn from "./AddToListBtn";
import SeasonCard from "./SeasonCard";
import PersonCard from "./PersonCard";
import RemoveFromListBtn from "./RemoveFromListBtn";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ShowPage = (props) => {
  const [showInfo, setShowInfo] = useState("");
  // const [trailer, setTrailer] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [seasonCards, setSeasonCards] = useState([]);
  const [cast, setCast] = useState([]);
  const [castCards, setCastCards] = useState([]);
  // const [crew, setCrew] = useState([]);

  const {
    id,
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = props;

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
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  
  const getShowDetails = async (showId) => {
    try {
      const response = await fetch(
        ` https://api.themoviedb.org/3/tv/${showId}?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
        {
          mode: "cors",
        }
      );
      const tvShow = await response.json();
      const show = {
        id: tvShow.id,
        poster: `https://image.tmdb.org/t/p/original/${tvShow.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original/${tvShow.backdrop_path}`,
        title: tvShow.name,
        genres: tvShow.genres
          ? tvShow.genres.map((show) => `${show.name}, `)
          : "",
        seasonNum: tvShow.number_of_seasons,
        episodeNum: tvShow.number_of_episodes,
        rating: tvShow.vote_average,
        plot: tvShow.overview,
        year: tvShow.first_air_date.split("-")[0],
      };
      setShowInfo(show);
      setSeasons(tvShow.seasons)
      // console.log(show.seasons)
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  const getCredits = async (showId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
        {
          mode: "cors",
        }
      );
      const credits = await response.json();
      setCast(credits.cast)
      // setCrew(credits.crew)
      // console.log(credits.crew)
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  // const getTrailer = async (showId) => {
  //   try {
  //     const response = await fetch(
  //       ` https://api.themoviedb.org/3/tv/${showId}/videos?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
  //       {
  //         mode: "cors",
  //       }
  //     );
  //     const trailer = await response.json();
  //     console.log(trailer.results.key)
  //     setTrailer(trailer.results[0].key);
  //   } catch (error) {
  //     console.error("Error:API", error);
  //   }
  // };


  useEffect(() => {
    getShowDetails(id)
    // getTrailer(id)
    getCredits(id)
  }, [id]);

  useEffect (() => {
    setSeasonCards(seasons.map((season) => (<SeasonCard key={season.id} season={season} />)))
  }, [seasons])

  useEffect (() => {
    setCastCards(cast.map((person) => (<PersonCard key={person.id} person={person} />)))
  }, [cast])

  return (
    <div className="showPage">
      <div >
        <img
          className={"backdropImg"}
          src={backdrop}
          alt={`${title} backdrop`}
        />
      </div>
      <div className="showInfoContainer">
        <div className="posterWrapper">
          <img src={poster} alt={`${title} poster`} />
          <AddToListBtn
            setWatchingList={setWatchingList}
            setWantToWatchList={setWantToWatchList}
            setCompletedList={setCompletedList}
            setDroppedList={setDroppedList}
            showData={showInfo}
          />
          <RemoveFromListBtn 
            setWatchingList={setWatchingList}
            setWantToWatchList={setWantToWatchList}
            setCompletedList={setCompletedList}
            setDroppedList={setDroppedList}
            showData={props.showData}
          />
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
      {/* <iframe className='trailer'
                title='Youtube player'
                allowFullScreen="allowfullscreen"
                src={`https://youtube.com/embed/${trailer}?autoplay=0`}>
      </iframe> */}
    </div>
  );
};

export default ShowPage;
