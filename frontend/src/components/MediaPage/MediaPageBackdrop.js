import React from "react";
import defaultMediaIcon from "../../img/default_media_icon.svg";
import styles from './MediaPageBackdrop.module.css';

const MediaPageBackdrop = ({ mediaInfo }) => {
  const { title, backdrop } = mediaInfo;

  return (
    <div className={styles.backdropWrapper}>
      {/* Render the backdrop image */}
      <img
        className={styles.backdrop}
        src={backdrop !== null ? backdrop : defaultMediaIcon}
        alt={`${title} backdrop`}
      />
    </div>
  );
};

export default MediaPageBackdrop;
