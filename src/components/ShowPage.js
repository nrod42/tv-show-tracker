import { useEffect, useState } from "react";
import AddToListBtn from "./AddToListBtn";

const ShowPage = (props) => {
  const [showInfo, setShowInfo] = useState("");
  const [trailer, setTrailer] = useState("");

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
    seasons,
  } = showInfo;
  
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
        seasons: tvShow.seasons,
        rating: tvShow.vote_average,
        plot: tvShow.overview,
        year: tvShow.first_air_date.split("-")[0],
      };
      setShowInfo(show);
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
      console.log(credits)
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  const getTrailer = async (showId) => {
    try {
      const response = await fetch(
        ` https://api.themoviedb.org/3/tv/${showId}/videos?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
        {
          mode: "cors",
        }
      );
      const trailer = await response.json();
      console.log(trailer.results.key)
      setTrailer(trailer.results[0].key);
    } catch (error) {
      console.error("Error:API", error);
    }
  };



  useEffect(() => {
    getShowDetails(id)
    getTrailer(id)
    getCredits(id)
  }, [id]);

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
        </div>
        <div className="showInfo">
          <h2>{title}</h2>
          <p>({year})</p>
          <p>Genres: {genres}</p>
          <p>Seasons: {seasonNum}</p>
          <p>Episodes: {episodeNum}</p>
          <p>Rating: {rating}</p>
          {/* <p>Staring: {actors}</p> */}
          <p>{plot}</p>
        </div>
      </div>
      <iframe className='trailer'
                title='Youtube player'
                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                src={`https://youtube.com/embed/${trailer}?autoplay=0`}>
        </iframe>
    </div>
  );
};

export default ShowPage;
