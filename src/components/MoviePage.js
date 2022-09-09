import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getRecMovies,
  getMovieTrailer,
} from "./API/getMovies";
import MovieCard from "./Cards/MovieCard";
import PersonCard from "./Cards/PersonCard";
import AddToListBtn from "./AddToListBtn";
import uniqid from "uniqid";

const MoviePage = () => {
  const [movieInfo, setMovieInfo] = useState("");
  const [cast, setCast] = useState([]);
  // const [crew, setCrew] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recMovies, setRecMovies] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [lgShow, setLgShow] = useState(false);

  const id = window.location.pathname.split(":")[1];

  //Fetch all relevant show info and saves them in a state
  useEffect(() => {
    (async () => {
      const movieInfo = await getMovieDetails(id);
      const credits = await getMovieCredits(id);
      const similarMovies = await getSimilarMovies(id);
      const recMovies = await getRecMovies(id);
      const trailer = await getMovieTrailer(id);
      setMovieInfo(movieInfo);
      setCast(credits.cast);
      // setCrew(credits.crew);
      setSimilarMovies(similarMovies);
      setRecMovies(recMovies);
      setTrailer(trailer);
      window.scrollTo(0, 0);
    })();
  }, [id]);

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
            <Button
              variant="warning"
              style={{ width: "100%", margin: "20px 0" }}
              onClick={() => setLgShow(true)}
            >
              Trailer
            </Button>
          </div>
          <div className="movieInfo">
            <div className="titleSection">
              <p>{movieInfo.title}</p>
              <p>({movieInfo.year})</p>
            </div>
            <p>Genres: {movieInfo.genres}</p>
            <p>Rating: {movieInfo.rating}</p>
            {/* <p>Crew: {crew.map((actor) => actor.name)}</p> */}
            <div className="plotSection">{movieInfo.plot}</div>
          </div>
        </div>
        <div className="stripWrapper">
          <h2>Starring</h2>
          <div className="strip">
            {cast.map((person) => (
              <PersonCard key={uniqid()} person={person} />
            ))}
          </div>
        </div>

        <div className="stripWrapper">
          <h2>Similar Movies</h2>
          <div className="strip">
            {similarMovies.map((movie) => (
              <MovieCard key={uniqid()} movieData={movie} />
            ))}
          </div>
        </div>
        <div className="stripWrapper">
          <h2>Recommended Movies</h2>
          <div className="strip">
            {recMovies.map((movie) => (
              <MovieCard key={uniqid()} movieData={movie} />
            ))}
          </div>
        </div>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          // dialogClassName="modal-100w"
          aria-labelledby="trailer"
        >
          <Modal.Header closeButton>
            <Modal.Title id="trailerModal">
              {movieInfo.title} - Trailer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "500px" }}>
            <iframe
              className="trailer"
              title="Youtube player"
              allowFullScreen="allowfullscreen"
              style={{ height: "100%", width: "100%" }}
              src={`https://youtube.com/embed/${trailer}?autoplay=0`}
            ></iframe>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default MoviePage;
