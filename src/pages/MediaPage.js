import React, { useState, useEffect } from "react";
import { getMediaDetails, getMediaCredits, getSimilarMedia, getRecMedia, getMediaTrailer } from "../components/API/getMedia";
import Strip from "../components/Strip";
import MediaCard from "../components/Cards/MediaCard";
import SeasonCard from "../components/Cards/SeasonCard";
import PersonCard from "../components/Cards/PersonCard";
import AddToListBtn from "../components/AddToListBtn";
import uniqid from "uniqid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MediaPage = () => {
  const [mediaInfo, setMediaInfo] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [recMedia, setRecMedia] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [lgShow, setLgShow] = useState(false);

  const id = window.location.pathname.split(":")[1];
  const mediaType = window.location.pathname.includes("shows") ? "tv" : "movie";

  const fetchMediaDetails = async () => {
    const mediaInfo = await getMediaDetails(id, mediaType);
    setMediaInfo(mediaInfo);
    if (mediaType === "tv") {
      setSeasons(mediaInfo.seasonsInfo);
    }
  };

  const fetchMediaCredits = async () => {
    const credits = await getMediaCredits(id, mediaType);
    setCast(credits.cast);
  };

  const fetchSimilarMedia = async () => {
    setSimilarMedia(await getSimilarMedia(id, mediaType));
  };

  const fetchRecMedia = async () => {
    setRecMedia(await getRecMedia(id, mediaType));
  };

  const fetchTrailer = async () => {
    setTrailer(await getMediaTrailer(id, mediaType));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMediaDetails();
    fetchMediaCredits();
    fetchSimilarMedia();
    fetchRecMedia();
    fetchTrailer();
  }, [id]);

  return (
    <div className="mediaPage">
      <div className="backdrop" style={{ height: "700px" }}>
        <img
          className={"backdropImg"}
          src={mediaInfo.backdrop}
          alt={`${mediaInfo.title} backdrop`}
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
              <img src={mediaInfo.poster} alt={`${mediaInfo.title} poster`} />
              <AddToListBtn data={mediaInfo} />
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
              <p>{mediaInfo.title}</p>
              <p>({mediaInfo.year?.split("-")[0]})</p>
            </div>
            {mediaType === "tv" && (
              <div className="seasonSection">
                <p>Seasons: {mediaInfo.seasonNum}</p>
                <p>Episodes: {mediaInfo.episodeNum}</p>
              </div>
            )}
            <p>Genres: {mediaInfo.genres}</p>
            <p>Rating: {mediaInfo.rating}</p>
            <div className="plotSection">{mediaInfo.plot}</div>
          </Col>
        </Row>
        {mediaType === "tv" && (
          <Strip
            title={"Seasons"}
            array={seasons.map((season) => (
              <SeasonCard key={uniqid()} season={season} />
            ))}
          />
        )}
        <Strip
          title={"Starring"}
          array={cast.map((person) => (
            <PersonCard key={uniqid()} person={person} />
          ))}
        />
        <Strip
          title={`Similar ${mediaType === "tv" ? "TV" : "Movies"}`}
          array={similarMedia.map((media) => (
            <MediaCard key={uniqid()} mediaData={media} />
          ))}
        />
        <Strip
          title={`Recommended ${mediaType === "tv" ? "TV" : "Movies"}`}
          array={recMedia.map((media) => (
            <MediaCard key={uniqid()} mediaData={media} />
          ))}
        />
      </Container>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="trailer"
      >
        <Modal.Header closeButton>
          <Modal.Title id="trailerModal">
            {mediaInfo.title} - Trailer
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

export default MediaPage;

