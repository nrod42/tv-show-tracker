import React from "react";
import Modal from "react-bootstrap/Modal";

const MediaPageTrailerModal = ({ lgShow, setLgShow, mediaTitle, trailer }) => {
  return (
    <Modal
      size="lg"
      show={lgShow}
      onHide={() => setLgShow(false)}
      aria-labelledby="trailer"
    >
      {/* Render the modal header */}
      <Modal.Header closeButton>
        <Modal.Title id="trailerModal">
          {mediaTitle} - Trailer
        </Modal.Title>
      </Modal.Header>

      {/* Render the modal body */}
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
  );
};

export default MediaPageTrailerModal;
