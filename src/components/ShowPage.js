import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TvCard from "./Cards/TvCard";
import SeasonCard from "./Cards/SeasonCard";
import PersonCard from "./Cards/PersonCard";
import AddToListBtn from "./AddToListBtn";
import uniqid from "uniqid";
import {
  getShowDetails,
  getShowCredits,
  getSimilarShows,
  getRecTV,
  getShowTrailer,
} from "./API/getTV";

const ShowPage = () => {
  const [showInfo, setShowInfo] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  // const [crew, setCrew] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [recShows, setRecShows] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [lgShow, setLgShow] = useState(false);

  const id = window.location.pathname.split(":")[1];

  const scrollToTop = ()=> {
    window.scrollTo({
               top: 0,
               left: 0,
               behavior: "smooth"
             })
   }

  //Fetch all relevant show info and saves them in a state
  useEffect(() => {
    (async () => {
      const showInfo = await getShowDetails(id);
      const credits = await getShowCredits(id);
      const similarShows = await getSimilarShows(id);
      const recShows = await getRecTV(id);
      const trailer = await getShowTrailer(id);
      setShowInfo(showInfo);
      setSeasons(showInfo.seasonsInfo);
      setCast(credits.cast);
      // setCrew(credits.crew);
      setSimilarShows(similarShows);
      setRecShows(recShows);
      setTrailer(trailer);
      scrollToTop();
    })();
  }, [id]);

  return (
    <div className="showPage">
      <div className="backdrop" style={{height: '30rem'}}>
        <img
          className={"backdropImg"}
          src={showInfo.backdrop}
          alt={`${showInfo.title} backdrop`}
          style={{  maxHeight: '100%',
            maxWidth: '100%',
            width: '100%',
            height: 'auto',
            objectFit: 'cover'}}
        />
      </div>
      <Container>
        <div className="allShowInfo">
          <Row>
            <Col lg={3} sm={12}>
              <div className="d-flex flex-column justify-content-center">
                <img src={showInfo.poster} alt={`${showInfo.title} poster`} />
                <AddToListBtn data={showInfo} />
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
                <p>{showInfo.title}</p>
                <p>({showInfo.year})</p>
              </div>
              <div className="seasonSection">
                <p>Seasons: {showInfo.seasonNum}</p>
                <p>Episodes: {showInfo.episodeNum}</p>
              </div>
              <p>Genres: {showInfo.genres}</p>
              <p>Rating: {showInfo.rating}</p>
              <div className="plotSection">{showInfo.plot}</div>
            </Col>
          </Row>
          <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
            <h2>Seasons</h2>
            <div className="strip">
              {seasons.map((season) => (
                <SeasonCard key={uniqid()} season={season} />
              ))}
            </div>
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
            <h2>Similar Shows</h2>
            <div className="strip">
              {similarShows.map((show) => (
                <TvCard key={uniqid()} showData={show} />
              ))}
            </div>
          </Row>
          <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
            <h2>Recommended Shows</h2>
            <div className="strip">
              {recShows.map((show) => (
                <TvCard key={uniqid()} showData={show} />
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
            {showInfo.title} - Trailer
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

export default ShowPage;
