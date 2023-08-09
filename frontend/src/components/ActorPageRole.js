import React from "react";
import { Link } from "react-router-dom";
import defaultMediaIcon from "../img/default_media_icon.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ActorPageRole = ({ roleInfo }) => {
  const { id, poster, title, year, type, role } = roleInfo;

  return (
    <>
      <div className="d-flex flex-row flex-wrap align-items-center justify-content-between mt-2 mb-2">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Link to={type === "tv" ? `/tv/${id}` : `/movie/${id}`}>
            <img
              src={poster !== null ? poster : defaultMediaIcon}
              alt={`${title} poster`}
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        </div>
        <div
          md={10}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Link to={type === "tv" ? `/tv/${id}` : `/movie/${id}`}>
            <div>
              <strong>{title}</strong>
            </div>
          </Link>
          <div>{role}</div>
        </div>
        <div
          md={1}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <div>{year}</div>
        </div>
      </div>
    </>
  );
};

export default ActorPageRole;
