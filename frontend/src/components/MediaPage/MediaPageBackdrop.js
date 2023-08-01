import React from "react";
import defaultMediaIcon from '../../img/default_media_icon.svg';

const MediaPageBackdrop = ({ mediaInfo }) => {
  const { title, backdrop } = mediaInfo;

  return (
    <div className="backdrop" style={{ height: "700px" }}>
      {/* Render the backdrop image */}
      <img
        className={"backdropImg"}
        src={backdrop !== null ? backdrop : defaultMediaIcon}
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
