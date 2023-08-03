import React from "react";
import AddToListBtn from "../../components/AddToListBtn";
import Button from "react-bootstrap/Button";
import defaultMediaIcon from "../../img/default_media_icon.svg";

const MediaPagePoster = ({ id, mediaInfo, mediaType, setLgShow }) => {
  const { title, poster } = mediaInfo;

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{
        marginTop: "-250px", // Use negative margin to create the overlap effect
        position: "relative",
        maxWidth: "342px",
      }}
    >
      {/* Render the poster image */}
      <img
        src={poster !== null ? poster : defaultMediaIcon}
        alt={`${title} poster`}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          backgroundColor: "white",
        }}
      />

      {/* Render the "Add to List" button */}
      <AddToListBtn id={id} type={mediaType} />

      {/* Render the "Trailer" button */}
      <Button
        variant="warning"
        style={{ margin: "20px 0" }}
        onClick={() => setLgShow(true)}
      >
        Trailer
      </Button>
    </div>
  );
};

export default MediaPagePoster;
