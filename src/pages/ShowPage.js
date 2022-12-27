import React, { useState, useEffect } from "react";
import {
  getShowDetails,
  getShowCredits,
  getSimilarShows,
  getRecTV,
  getShowTrailer,
} from "../components/API/getTV";
import Strip from "../components/Strip";
import TvCard from "../components/Cards/TvCard";
import SeasonCard from "../components/Cards/SeasonCard";
import PersonCard from "../components/Cards/PersonCard";
import AddToListBtn from "../components/AddToListBtn";
import uniqid from "uniqid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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

  //Fetch all relevant show info and saves them in a state
  const fetchShowDetails = async () => {
    const showInfo = await getShowDetails(id);
    setShowInfo(showInfo);
    setSeasons(showInfo.seasonsInfo);
  };

  const fetchShowCredits = async () => {
    const credits = await getShowCredits(id);
    setCast(credits.cast);
    // setCrew(credits.crew);
  };

  const fetchSimilarShows = async () => {
    setSimilarShows(await getSimilarShows(id));
  };

  const fetchRecShows = async () => {
    setRecShows(await getRecTV(id));
  };

  const fetchTrailer = async () => {
    setTrailer(await getShowTrailer(id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchShowDetails();
    fetchShowCredits();
    fetchSimilarShows();
    fetchRecShows();
    fetchTrailer();
  }, [id]);

  return (
    <div className="showPage">
      <div className="backdrop" style={{ height: "700px" }}>
        <img
          className={"backdropImg"}
          src={showInfo.backdrop}
          alt={`${showInfo.title} backdrop`}
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
        <Strip
          title={"Seasons"}
          array={seasons.map((season) => (
            <SeasonCard key={uniqid()} season={season} />
          ))}
        />
        <Strip
          title={"Starring"}
          array={cast.map((person) => (
            <PersonCard key={uniqid()} person={person} />
          ))}
        />
        <Strip
          title={"Similar Shows"}
          array={similarShows.map((show) => (
            <TvCard key={uniqid()} showData={show} />
          ))}
        />
        <Strip
          title={"Recommended Shows"}
          array={recShows.map((show) => (
            <TvCard key={uniqid()} showData={show} />
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
