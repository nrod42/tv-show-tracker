import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import {
  getMediaDetails,
  getMediaCredits,
  getSimilarMedia,
  getRecMedia,
  getMediaTrailer,
} from "../components/API/getMedia";
import MediaCard from "../components/Cards/MediaCard";
import SeasonCard from "../components/Cards/SeasonCard";
import PersonCard from "../components/Cards/PersonCard";
import MediaPageInfoSection from "../components/MediaPage/MediaPageInfoSection";
import MediaPageBackdrop from "../components/MediaPage/MediaPageBackdrop";
import MediaPagePoster from "../components/MediaPage/MediaPagePoster";
import MediaPageTrailerModal from "../components/MediaPage/MediaPageTrailerModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import rightArrowBlack from "../img/right_arrow_black.svg";
import rightArrowWhite from "../img/right_arrow_white.svg";
import styles from "./MediaPage.module.css";


const MediaPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { id, mediaType } = useParams();

  const [mediaInfo, setMediaInfo] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [recMedia, setRecMedia] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [lgShow, setLgShow] = useState(false);

  // const mediaType = window.location.pathname.includes("shows") ? "tv" : "movie";

  // Fetch media details
  const fetchMediaDetails = async () => {
    const mediaInfo = await getMediaDetails(id, mediaType);
    setMediaInfo(mediaInfo);
    if (mediaType === "tv") {
      // Checks for season 0 (Specials season), and moves it to end of array
      if (mediaInfo.seasonsInfo[0].season_number === 0) {
        const seasonZero = mediaInfo.seasonsInfo.shift();
        mediaInfo.seasonsInfo.push(seasonZero);
      }
      setSeasons(mediaInfo.seasonsInfo);
    }
  };

  // Fetch media credits
  const fetchMediaCredits = async () => {
    const credits = await getMediaCredits(id, mediaType);
    setCast(credits.cast);
    setCrew(credits.crew);
  };

  // Fetch similar media
  const fetchSimilarMedia = async () => {
    setSimilarMedia(await getSimilarMedia(id, mediaType));
  };

  // Fetch recommended media
  const fetchRecMedia = async () => {
    setRecMedia(await getRecMedia(id, mediaType));
  };

  // Fetch media trailer
  const fetchTrailer = async () => {
    setTrailer(await getMediaTrailer(id, mediaType));
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    const fetchData = async () => {
      await fetchMediaDetails();
      await fetchMediaCredits();
      await fetchSimilarMedia();
      await fetchRecMedia();
      await fetchTrailer();
    };

    fetchData();

  }, [id]);

  return (
    <div className={darkMode ? styles.mediaPageDark : styles.mediaPageLight}>
      {/* Render the media backdrop */}
      <MediaPageBackdrop mediaInfo={mediaInfo} />
      <Container style={{ marginTop: "40px" }}>
        <Row className="mb-5">
          <Col lg={3} sm={12} className={styles.posterWrapper}>
            {/* Render the media poster and related buttons */}
            <MediaPagePoster
              id={id}
              mediaInfo={mediaInfo}
              mediaType={mediaType}
              setLgShow={setLgShow}
            />
          </Col>
          <Col lg={9} sm={12}>
            {/* Render the media information section */}
            <MediaPageInfoSection
              mediaInfo={{...mediaInfo, crew: crew}}
              mediaType={mediaType}
            />
          </Col>
        </Row>

        {/* Render seasons for TV shows */}
        {mediaType === "tv" && seasons.length > 0 && (
          <>
            <h2 className="mt-5 mb-5">Seasons</h2>
            <Row>
              {seasons.map((season) => (
                <Col key={season.id} xs={6} sm={4} md={3} lg={2}>
                  <SeasonCard season={season} />
                </Col>
              ))}
            </Row>
          </>
        )}
        {mediaType === "tv" && seasons.length === 0 && (
          <>
            <h2 className="mt-5 mb-5">Seasons</h2>
            <p className="text-center mt-5 mb-5">Not Available</p>
          </>
        )}

        {/* Render cast */}
        {cast.length > 0 && (
          <>
            <Link to={`/${mediaType}/credits/${id}`}>
              <div className="d-flex flex-row justify-content-between align-items-center mt-5 mb-5">
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <h2 style={{margin: 0}}>Cast</h2>
                  <img src={darkMode ? rightArrowWhite : rightArrowBlack}  style={{ height: "25px", width: "auto", marginLeft: "10px" }}></img>
                </div>
                <span>Full Cast & Crew</span>
              </div>
            </Link>
            <Row>
              {cast
                .map((person) => (
                  <Col key={person.id} xs={6} sm={4} md={3} lg={2}>
                    <PersonCard person={person} />
                  </Col>
                ))
                .slice(0, 6)}
            </Row>
          </>
        )}
        {cast.length === 0 && (
          <>
            <h2 className="mt-5 mb-5">Cast</h2>
            <p className="text-center mt-5 mb-5">Not Available</p>
          </>
        )}

        {/* Render recommended media */}
        {recMedia.length > 0 && (
          <>
            <Link to={`/${mediaType}/related/recommended/${id}`}>
              <div className="d-flex flex-row justify-content-between align-items-center mt-5 mb-5">
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <h2 style={{margin: 0}}>Recommended</h2>
                  <img src={darkMode ? rightArrowWhite : rightArrowBlack}  style={{ height: "25px", width: "auto", marginLeft: "10px" }}></img>
                </div>
                <span>Show More</span>
              </div>
            </Link>
            <Row>
              {recMedia
                .map((media) => (
                  <Col key={media.id} xs={6} sm={4} md={3} lg={2}>
                    <MediaCard mediaData={media} />
                  </Col>
                ))
                .slice(0, 6)}
            </Row>
          </>
        )}
        {recMedia.length === 0 && (
          <>
            <h2 className="mt-5 mb-5">Recommended</h2>
            <p className="text-center mt-5 mb-5">Not Available</p>
          </>
        )}

        {/* Render similar media */}
        {similarMedia.length > 0 && (
          <>
            <Link to={`/${mediaType}/related/similar/${id}`}>
              <div className="d-flex flex-row justify-content-between align-items-center mt-5 mb-5">
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <h2 style={{margin: 0}}>Similar</h2>
                  <img src={darkMode ? rightArrowWhite : rightArrowBlack}  style={{ height: "25px", width: "auto", marginLeft: "10px" }}></img>
                </div>
                <span>Show More</span>
              </div>
            </Link>
            <Row>
              {similarMedia
                .map((media) => (
                  <Col key={media.id} xs={6} sm={4} md={3} lg={2}>
                    <MediaCard mediaData={media} />
                  </Col>
                ))
                .slice(0, 6)}
            </Row>
          </>
        )}
        {similarMedia.length === 0 && (
          <>
            <h2 className="mt-5 mb-5">Similar</h2>
            <p className="text-center mt-5 mb-5">Not Available</p>
          </>
        )}
      </Container>

      {/* Render the trailer modal */}
      <MediaPageTrailerModal
        lgShow={lgShow}
        setLgShow={setLgShow}
        mediaTitle={mediaInfo.title}
        trailer={trailer}
      />
    </div>
  );
};

export default MediaPage;
