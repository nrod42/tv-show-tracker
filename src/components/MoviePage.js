import { useEffect, useState } from "react";
import { getMovieDetails, getMovieCredits, getSimilarMovies, getRecMovies } from "./API/getMovies";
import PersonCard from "./PersonCard";
import MovieCard from "./MovieCard";
import AddToListBtn from "./AddToListBtn";
import "./Styles/moviePage.css";


const MoviePage = () => {
  const [movieInfo, setMovieInfo] = useState("");
  const [cast, setCast] = useState([]);
  // const [crew, setCrew] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recMovies, setRecMovies] = useState([]);
  // const [isVideoOpen, setVideoOpen] = useState(false);
  // const [trailer, setTrailer] = useState("");

  const id = window.location.pathname.split(":")[1];

  //Fetch all relevant show info and saves them in a state
useEffect(() => {
  (async () => {
    const movieInfo = await getMovieDetails(id);
    const credits = await getMovieCredits(id);
    const similarMovies = await getSimilarMovies(id);
    const recMovies = await getRecMovies(id);
    // const trailer = await getShowTrailer(id)
    setMovieInfo(movieInfo);
    setCast(credits.cast);
    // setCrew(credits.crew);
    setSimilarMovies(similarMovies);
    setRecMovies(recMovies);
    // setTrailer(trailer);
  })();
})

  return (
    <div className="moviePage">
      <div className="backdrop">
        <img
          className={"backdropImg"}
          src={movieInfo.backdrop}
          alt={`${movieInfo.title} backdrop`}
        />
      </div>
      <div className="allMovieInfo">
        <div className="movieInfoContainer">
          <div className="moviePosterWrapper">
            <img src={movieInfo.poster} alt={`${movieInfo.title} poster`} />
            <AddToListBtn data={movieInfo} />
            <div>
              <button 
                // onClick={() => setVideoOpen((prev) => !prev)}
              >
                Trailer
              </button>
            </div>
          </div>
          <div className="movieInfo">
            <div className="titleSection">
              <p>{movieInfo.title}</p>
              <p>({movieInfo.year})</p>
            </div>
            <p>Genres: {movieInfo.genres}</p>
            <p>Rating: {movieInfo.rating}</p>
            {/* <p>Crew: {crew.map((actor) => actor.name)}</p> */}
            <div className="plot">{movieInfo.plot}</div>
          </div>
        </div>
        <div className="castWrapper">
          <h2>Starring</h2>
          <div className="strip">
          {cast.map((person) => <PersonCard key={person.id} person={person} />)}
          </div>
        </div>
        
        <div className="similarMoviesWrapper">
          <h2>Similar Movies</h2>
          <div className="strip">
            {similarMovies.map((movie) => <MovieCard key={movie.id} movieData={movie} />)}
          </div>
        </div>
        <div className="recMoviesWrapper">
          <h2>Recommended Movies</h2>
          <div className="strip">
            {recMovies.map((movie) => <MovieCard key={movie.id} movieData={movie} />)}
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

export default MoviePage;