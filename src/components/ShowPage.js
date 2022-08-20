import { useEffect, useState } from "react";
import AddToListBtn from "./AddToListBtn";
// import SeasonCard from "./SeasonCard";

const ShowPage = (props) => {
  //   const [popupClass, setPopupClass] = useState(false);
  const [showInfo, setShowInfo] = useState("");
  const [trailer, setTrailer] = useState("");
  const {
    title,
    backdrop,
    poster,
    rating,
    seasons,
    episodes,
    genres,
    plot,
    year,
  } = showInfo;

  const { id } = props.showPage;

  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
  } = props;

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
        seasons: tvShow.number_of_seasons,
        episodes: tvShow.number_of_episodes,
        rating: tvShow.vote_average,
        plot: tvShow.overview,
        year: tvShow.first_air_date.split("-")[0],
      };
      setShowInfo(show);
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
    getShowDetails(id);
    getTrailer(id)
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
          <p>Seasons: {seasons}</p>
          <p>Episodes: {episodes}</p>
          <p>Rating: {rating}</p>
          {/* <p>Staring: {actors}</p> */}
          <p>{plot}</p>
          {/* <SeasonCard  seasonInfo = {} /> */}
        </div>
        <iframe className='video'
                title='Youtube player'
                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                src={`https://youtube.com/embed/${trailer}?autoplay=0`}>
        </iframe>
      </div>
    </div>
  );
};

export default ShowPage;
