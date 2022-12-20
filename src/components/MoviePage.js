import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MovieCard from "./Cards/MovieCard";
import PersonCard from "./Cards/PersonCard";
import AddToListBtn from "./AddToListBtn";
import uniqid from "uniqid";
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getRecMovies,
  getMovieTrailer,
} from "./API/getMovies";

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
      <Container>
        <div className="allMovieInfo">
          <Row>
            <Col lg={3} sm={12}>
              <div className="d-flex flex-column justify-content-center">
                <img src={movieInfo.poster} alt={`${movieInfo.title} poster`} />
                <AddToListBtn data={movieInfo} />
                <Button
                  variant="warning"
                  style={{ margin: "20px 0" }}
                  onClick={() => setLgShow(true)}
                >
                  Trailer
                </Button>
              </div>
            </Col>
            <Col lg={9} sm={12}>
              <div className="titleSection">
                <p>{movieInfo.title}</p>
                <p>({movieInfo.year?.split("-")[0]})</p>
              </div>
              <p>Genres: {movieInfo.genres}</p>
              <p>Rating: {movieInfo.rating}</p>
              {/* <p>Crew: {crew.map((actor) => actor.name)}</p> */}
              <div className="plotSection">{movieInfo.plot}</div>
            </Col>
          </Row>
          <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
            <h2>Starring</h2>
            <div className="strip">
              {cast.map((person) => (
                <PersonCard key={uniqid()} person={person} />
              ))}
            </div>
          </Row>
          <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
            <h2>Similar Movies</h2>
            <div className="strip">
              {similarMovies.map((movie) => (
                <MovieCard key={uniqid()} movieData={movie} />
              ))}
            </div>
          </Row>
          <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
            <h2>Recommended Movies</h2>
            <div className="strip">
              {recMovies.map((movie) => (
                <MovieCard key={uniqid()} movieData={movie} />
              ))}
            </div>
          </Row>
        </div>
      </Container>
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
  );
};

export default MoviePage;
