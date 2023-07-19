import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMediaDetails, getMediaCredits, getSimilarMedia, getRecMedia, getMediaTrailer } from "../components/API/getMedia";
import Strip from "../components/Strip";
import MediaCard from "../components/Cards/MediaCard";
import SeasonCard from "../components/Cards/SeasonCard";
import PersonCard from "../components/Cards/PersonCard";
import MediaPageInfoSection from "../components/MediaPageInfoSection";
import MediaPageBackdrop from "../components/MediaPageBackdrop";
import MediaPagePoster from "../components/MediaPagePoster";
import MediaPageTrailerModal from "../components/MediaPageTrailerModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MediaPage = () => {
  const [mediaInfo, setMediaInfo] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [recMedia, setRecMedia] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [lgShow, setLgShow] = useState(false);

  const { id } = useParams();
  const mediaType = window.location.pathname.includes("shows") ? "tv" : "movie";

  // Fetch media details
  const fetchMediaDetails = async () => {
    const mediaInfo = await getMediaDetails(id, mediaType);
    setMediaInfo(mediaInfo);
    if (mediaType === "tv") {
      setSeasons(mediaInfo.seasonsInfo);
    }
  };

  // Fetch media credits
  const fetchMediaCredits = async () => {
    const credits = await getMediaCredits(id, mediaType);
    setCast(credits.cast);
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

    // Fetch media details, credits, similar media, rec media, and trailer
    fetchMediaDetails();
    fetchMediaCredits();
    fetchSimilarMedia();
    fetchRecMedia();
    fetchTrailer();
  }, [id]);

  return (
    <div className="mediaPage">
      {/* Render the media backdrop */}
      <MediaPageBackdrop mediaInfo={mediaInfo} />
      <Container style={{ marginTop: "40px" }}>
        <Row>
          <Col lg={3} sm={12}>
            {/* Render the media poster and related buttons */}
            <MediaPagePoster id={id} mediaInfo={mediaInfo} mediaType={mediaType} setLgShow={setLgShow} />
          </Col>
          <Col lg={9} sm={12}>
            {/* Render the media information section */}
            <MediaPageInfoSection mediaInfo={mediaInfo} mediaType={mediaType} />
          </Col>
        </Row>
        {/* Render seasons strip for TV shows */}
        {mediaType === "tv" && (
          <Strip
            title={"Seasons"}
            array={seasons.map((season) => (
              <SeasonCard key={season.id} season={season} />
            ))}
          />
        )}
        {/* Render strip for starring cast */}
        <Strip
          title={"Starring"}
          array={cast.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        />
        {/* Render strip for similar media */}
        <Strip
          title={`Similar ${mediaType === "tv" ? "TV" : "Movies"}`}
          array={similarMedia.map((media) => (
            <MediaCard key={media.id} mediaData={media} />
          ))}
        />
        {/* Render strip for recommended media */}
        <Strip
          title={`Recommended ${mediaType === "tv" ? "TV" : "Movies"}`}
          array={recMedia.map((media) => (
            <MediaCard key={media.id} mediaData={media} />
          ))}
        />
      </Container>
      {/* Render the trailer modal */}
      <MediaPageTrailerModal lgShow={lgShow} setLgShow={setLgShow} mediaTitle={mediaInfo.title} trailer={trailer} />
    </div>
  );
};

export default MediaPage;