import React from "react";

const MediaPageBackdrop = ({ mediaInfo }) => {
  const { title, backdrop } = mediaInfo;

  return (
    <div className="backdrop" style={{ height: "700px" }}>
      {/* Render the backdrop image */}
      <img
        className={"backdropImg"}
        src={backdrop}
        alt={`${title} backdrop`}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          width: "100%",
          minHeight: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default MediaPageBackdrop;
