import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import PersonCard from "./Cards/PersonCard.tsx";
import MediaCard from "./Cards/MediaCard.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import rightArrowWhite from "../img/right_arrow_white.svg";
import rightArrowBlack from "../img/right_arrow_black.svg";
import SeasonCard from "./Cards/SeasonCard";

const CardStripSection = ({ media, title, linkTo }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <section>
      {media.length > 0 ? (
        <>
          {/* Strip Heading */}
          {linkTo ? (
            <div className="d-flex flex-row justify-content-between align-items-center mt-5 mb-5">
              <Link to={linkTo}>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <h2 style={{ margin: 0 }}>{title}</h2>
                  <img
                    src={darkMode ? rightArrowWhite : rightArrowBlack}
                    alt={""}
                    style={{
                      height: "25px",
                      width: "auto",
                      marginLeft: "10px",
                    }}
                  ></img>
                </div>
              </Link>
              <Link to={linkTo}>
                <span>Show More</span>
              </Link>
            </div>
          ) : (
            <h2 className="mt-5 mb-5">{title}</h2>
          )}

          {/* Row of media/person/season cards */}
          <Row>
            {media
              .map((item) => (
                <Col key={item.id} xs={6} sm={4} md={3} lg={2}>
                  {title === "Cast" ? (
                    <PersonCard person={item} />
                  ) : title === "Seasons" ? (
                    <SeasonCard season={item} />
                  ) : (
                    <MediaCard mediaData={item} />
                  )}
                </Col>
              ))
              .slice(0, 6)}
          </Row>
        </>
      ) : (
        <>
          <h2 className="mt-5 mb-5">{title}</h2>
          <p className="text-center mt-5 mb-5">Not Available</p>
        </>
      )}
    </section>
  );
};

export default CardStripSection;
