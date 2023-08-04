import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import {
  getMediaDetails,
  getMediaCredits,
  getSimilarMedia,
  getRecMedia,
  getMediaTrailer,
} from "../components/API/getMedia";
import CardStripSection from "../components/CardStripSection";
import MediaPageInfoSection from "../components/MediaPage/MediaPageInfoSection";
import MediaPageBackdrop from "../components/MediaPage/MediaPageBackdrop";
import MediaPagePoster from "../components/MediaPage/MediaPagePoster";
import MediaPageTrailerModal from "../components/MediaPage/MediaPageTrailerModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

  const fetchAllData = async () => {
    await fetchMediaDetails();
    await fetchMediaCredits();
    await fetchSimilarMedia();
    await fetchRecMedia();
    await fetchTrailer();
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    fetchAllData();
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
              mediaInfo={{ ...mediaInfo, crew: crew }}
              mediaType={mediaType}
            />
          </Col>
        </Row>

        {/* Render seasons for TV shows */}
        {mediaType === "tv" && seasons.length > 0 && (
          <CardStripSection media={seasons} title={"Seasons"} />
        )}

        {/* Render cast */}
        <CardStripSection
          media={cast}
          title={"Cast"}
          linkTo={`/${mediaType}/credits/${id}`}
        />

        {/* Render recommended media */}
        <CardStripSection
          media={recMedia}
          title={"Recommended"}
          linkTo={`/${mediaType}/related/recommended/${id}`}
        />

        {/* Render similar media */}
        <CardStripSection
          media={similarMedia}
          title={"Similar"}
          linkTo={`/${mediaType}/related/similar/${id}`}
        />
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
