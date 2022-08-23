import { useState, useEffect } from "react";
import AddToListBtn from "./AddToListBtn";
import RemoveFromListBtn from "./RemoveFromListBtn";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MoviePage = (props) => {
  const [movieInfo, setMovieInfo] = useState("");
  //   const [trailer, setTrailer] = useState("");

  const { id } = props;

  const { title, backdrop, poster, rating, genres, plot, year } = movieInfo;

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

  const getMovieDetails = async (movieId) => {
    try {
      const response = await fetch(
        ` https://api.themoviedb.org/3/tv/${showId}?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
        {
          mode: "cors",
        }
      );
      const movie = await response.json();
      console.log(movie);
      //   const movieData = {
      //     id: movie.id,
      //     poster: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
      //     backdrop: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
      //     title: movie.name,
      //     genres: movie.genres
      //       ? movie.genres.map((show) => `${show.name}, `)
      //       : "",
      //     rating: movie.vote_average,
      //     plot: movie.overview,
      //     year: movie.first_air_date.split("-")[0],
      //   };
      //   setMovieInfo(movieData);
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  useEffect(() => {
    getMovieDetails(id);
    // getTrailer(id);
    // getCredits(id);
  }, [id]);

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
          <RemoveFromListBtn showData={props.showData} />
        </div>
        <div className="showInfo">
          <div>
            <h2>{title}</h2>
            <p>({year})</p>
          </div>
          <p>Genres: {genres}</p>
          <p>Rating: {rating}</p>
          <p>{plot}</p>
        </div>
      </div>
      <h2>Seasons</h2>

      <h2>Starring</h2>
      <Carousel
        containerClass="carousel-container"
        responsive={responsive}
        swipeable={true}
        draggable={true}
      >
        {castCards}
      </Carousel>
      {/* <iframe
        className="trailer"
        title="Youtube player"
        allowFullScreen="allowfullscreen"
        src={`https://youtube.com/embed/${trailer}?autoplay=0`}
      ></iframe> */}
    </div>
  );
};

export default MoviePage;
