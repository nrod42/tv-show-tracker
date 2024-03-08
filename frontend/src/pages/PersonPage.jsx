import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import getActorRoles from "../components/API/getActorRoles.tsx";
import getActorInfo from "../components/API/getActorInfo.tsx";
import { format } from "date-fns";
import ActorPageRole from "../components/ActorPageRole";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import uniqid from "uniqid";
import styles from "./PersonPage.module.css";

const PersonPage = () => {
  // Context and state variables
  const { darkMode } = useContext(DarkModeContext);
  const { actorId } = useParams();
  const [actorInfo, setActorInfo] = useState("");
  const [actorRoles, setActorRoles] = useState([]);
  const [showFullBio, setShowFullBio] = useState(false);

  // Destructuring actorInfo object for easier access
  const { name, profile_path, birthday, place_of_birth, biography } = actorInfo;

  // Fetch actor's basic information
  const fetchActorInfo = async () => {
    const info = await getActorInfo(actorId);
    setActorInfo(info);
  };

  // Fetch actor's acting roles
  const fetchActingRoles = async () => {
    const roles = await getActorRoles(actorId);
    setActorRoles(roles);
  };

  // Toggle for displaying full biography or truncated version
  const handleShowFullBio = () => {
    setShowFullBio((prev) => !prev);
  };

  // Fetch actor info and acting roles on component mount
  useEffect(() => {
    fetchActorInfo();
    fetchActingRoles();
  }, [actorId]);

  return (
    // Main container for the Person Page
    <div className={darkMode ? styles.personPageDark : styles.personPageLight}>
      <Container style={{ marginTop: "80px" }}>
        {/* Actor Information Section */}
        <Row className="actorInfo">
          <Col md={2} className="actorProfile">
            {/* Display actor profile image */}
            <img
              src={`https://image.tmdb.org/t/p/w185${profile_path}`}
              alt={`${name} profile`}
            />
          </Col>
          <Col md={10} className="actorDetails">
            {/* Display actor's name, birthday, and place of birth */}
            <h2>{name}</h2>
            <p>
              <strong>Birthday: </strong>
              {birthday ? format(new Date(birthday), "MMMM d, yyyy") : "N/A"}
            </p>
            <p>
              <strong>Place of Birth:</strong> {place_of_birth}
            </p>
            {/* Display actor's biography, either truncated or full */}
            <h3>Biography</h3>
            {showFullBio ? (
              <p>{biography}</p>
            ) : (
              <p>{String(biography).slice(0, 300)}...</p>
            )}
            {/* Show "Show More" or "Show Less" button based on bio length */}
            <div className="d-flex justify-content-center">
              {!showFullBio && (
                <Button
                  variant="link"
                  className="d-flex justify-content-center"
                  onClick={handleShowFullBio}
                >
                  Show More
                </Button>
              )}
              {showFullBio && (
                <Button
                  variant="link"
                  className="d-flex justify-content-center"
                  onClick={handleShowFullBio}
                >
                  Show Less
                </Button>
              )}
            </div>
          </Col>
        </Row>
        {/* Acting Roles Section */}
        <div className="d-flex flex-column align-items-center mt-5 mb-5">
          <h2 className="mt-3 mb-3">Acting Roles</h2>
          {/* Display a list of actor's roles */}
          <div
            className="d-flex flex-column justify-content-between align-items-start"
            style={{ minWidth: "80%" }}
          >
            {actorRoles
              // Sort roles by year in descending order
              .sort((a, b) => {
                const yearA = parseInt(a.year, 10);
                const yearB = parseInt(b.year, 10);
                return yearB - yearA;
              })
              // Map and render ActorPageRole component for each role
              .map((role) => (
                <ActorPageRole key={uniqid()} roleInfo={role} />
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PersonPage;
