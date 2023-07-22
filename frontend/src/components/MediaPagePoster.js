import React from "react";
import AddToListBtn from "../components/AddToListBtn";
import Button from "react-bootstrap/Button";

const MediaPagePoster = ({ id, mediaInfo, mediaType, setLgShow }) => {
  const { title, poster } = mediaInfo;

  return (
    <div 
    className="d-flex flex-column justify-content-center" 
    style={{
      position: 'absolute',
      bottom: '50px',
      left: '80px',
    }}
    >
      {/* Render the poster image */}
      <img src={poster} alt={`${title} poster`} />

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
