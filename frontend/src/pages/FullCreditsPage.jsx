import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import getMediaCredits from "../components/API/getMediaCredits.tsx";
import PersonCard from "../components/Cards/PersonCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import uniqid from "uniqid";
import styles from "./FullCreditsPage.module.css";

const FullCreditsPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { mediaType, id } = useParams();

  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const fetchMediaCredits = async () => {
    const credits = await getMediaCredits(id, mediaType);
    setCast(credits.cast);
    setCrew(credits.crew);
  };

  useEffect(() => {
    fetchMediaCredits();
  }, []);

  return (
    <div
      className={`mt-5 ${
        darkMode ? styles.fullCreditsPageDark : styles.fullCreditsPageLight
      }`}
    >
      <Container>
        <h2 className="text-center mt-5 mb-5">Cast</h2>
        <Row>
          {cast.map((person) => (
            <Col key={uniqid()} lg={2} md={4} sm={6} xs={6}>
              <PersonCard person={person} />
            </Col>
          ))}
        </Row>
        <h2 className="text-center mt-5 mb-5">Crew</h2>
        <Row>
          {crew.map((person) => (
            <Col key={uniqid()} xs={6} sm={4} md={3} lg={2}>
              <PersonCard person={person} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FullCreditsPage;
