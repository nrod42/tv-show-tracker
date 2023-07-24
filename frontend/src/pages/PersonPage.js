import React, { useState, useEffect, useContext } from "react";
import { getActorInfo, getActorRoles } from "../components/API/getMedia";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import uniqid from "uniqid";
import ActorPageRole from "../components/ActorPageRole";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { DarkModeContext } from "../DarkModeContext";
import { format } from "date-fns";
import styles from "./PersonPage.module.css";

const PersonPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { actorId } = useParams();
  const [actorInfo, setActorInfo] = useState("");
  const [actorRoles, setActorRoles] = useState([]);
  const [showFullBio, setShowFullBio] = useState(false);
  // const [rolesToShow, setRolesToShow] = useState(10);
  // const [totalRoles, setTotalRoles] = useState(0);

  const { name, profile_path, birthday, place_of_birth, biography } = actorInfo;
  // const { id, poster, title, rating, year, type } = mediaData;

  const fetchActorInfo = async () => {
    const info = await getActorInfo(actorId);
    setActorInfo(info);
  };

  const fetchActingRoles = async () => {
    const roles = await getActorRoles(actorId);
    // setTotalRoles(roles.cast.length);

    // Get the roles to show based on the current state
    // const rolesToDisplay = roles.cast.slice(0, rolesToShow);
    // setActorRoles(rolesToDisplay);
    setActorRoles(roles);
  };

  // const handleShowMoreRoles = () => {
  //   // Increase the number of roles to show by 10
  //   setRolesToShow((prevRolesToShow) => prevRolesToShow + 10);
  // };

  const handleShowFullBio = () => {
    setShowFullBio((prev) => !prev);
  };

  useEffect(() => {
    fetchActorInfo();
    fetchActingRoles();
  }, [actorId]);

  return (
    <div className={darkMode ? styles.personPageDark : styles.personPageLight}>
      <Container style={{ marginTop: "80px" }}>
        <Row
          className="actorInfo"
          // style={{ display: "flex", gap: "20px" }}
        >
          <Col md={2} className="actorProfile">
            <img
              src={`https://image.tmdb.org/t/p/w185${profile_path}`}
              alt={`${name} profile`}
            />
          </Col>
          <Col md={10} className="actorDetails">
            <h2>{name}</h2>
            <p>
              <strong>Birthday: </strong>
              {/* {format(new Date(birthday), "MM d, yyyy")} */}
            </p>
            <p>
              <strong>Place of Birth:</strong> {place_of_birth}
            </p>
            <h3>Biography</h3>
            {showFullBio ? (
              <p>{biography}</p>
            ) : (
              <p>{String(biography).slice(0, 300)}...</p>
            )}
            {!showFullBio && (
              <Button variant="link" onClick={handleShowFullBio}>
                Show More
              </Button>
            )}
            {showFullBio && (
              <Button variant="link" onClick={handleShowFullBio}>
                Show Less
              </Button>
            )}
          </Col>
        </Row>
        <div>
          <h2 className="text-center mt-3 mb-3">Acting Roles</h2>
          <div>
            {actorRoles
              .sort((a, b) => {
                const yearA = parseInt(a.year, 10);
                const yearB = parseInt(b.year, 10);
                return yearB - yearA;
              })
              .map((role) => (
                <ActorPageRole key={uniqid()} roleInfo={role} />
              ))}
          </div>
          {/* Show the "Show More" button only if there are more roles to show */}
          {/* {rolesToShow < totalRoles && (
            <Button onClick={handleShowMoreRoles}>Show More</Button>
          )} */}
        </div>
      </Container>
    </div>
  );
};

export default PersonPage;
