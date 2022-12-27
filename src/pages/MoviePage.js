import React, { useState, useEffect } from "react";
import Strip from "../components/Strip";
import MovieCard from "../components/Cards/MovieCard";
import PersonCard from "../components/Cards/PersonCard";
import AddToListBtn from "../components/AddToListBtn";
import uniqid from "uniqid";
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getRecMovies,
  getMovieTrailer,
} from "../components/API/getMovies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
  const fetchMovieDetails = async () => {
    setMovieInfo(await getMovieDetails(id));
  };

  const fetchMovieCredits = async () => {
    const credits = await getMovieCredits(id);
    setCast(credits.cast);
    // setCrew(credits.crew);
  };

  const fetchSimilarMovies = async () => {
    setSimilarMovies(await getSimilarMovies(id));
  };

  const fetchRecMovies = async () => {
    setRecMovies(await getRecMovies(id));
  };

  const fetchTrailer = async () => {
    setTrailer(await getMovieTrailer(id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovieDetails();
    fetchMovieCredits();
    fetchSimilarMovies();
    fetchRecMovies();
    fetchTrailer();
  }, [id]);

  return (
    <div className="moviePage">
      <div className="backdrop" style={{ height: "700px" }}>
        <img
          className={"backdropImg"}
          src={movieInfo.backdrop}
          alt={`${movieInfo.title} backdrop`}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            width: "100%",
            minHeight: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <Container style={{ marginTop: "40px" }}>
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
        <Strip
          title={"Starring"}
          array={cast.map((person) => (
            <PersonCard key={uniqid()} person={person} />
          ))}
        />
        <Strip
          title={"Similar Movies"}
          array={similarMovies.map((movie) => (
            <MovieCard key={uniqid()} movieData={movie} />
          ))}
        />
        <Strip
          title={"Recommended Movies"}
          array={recMovies.map((movie) => (
            <MovieCard key={uniqid()} movieData={movie} />
          ))}
        />
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
