import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext.jsx";
import getMediaCredits from "../components/API/getMediaCredits.tsx";
import PersonCard from "../components/Cards/PersonCard.tsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import uniqid from "uniqid";
import styles from "./FullCreditsPage.module.css";

interface Credits {
  cast: Person[];
  crew: Person[];
}

interface Person {
  id: String;
  name: String;
  character: String;
}
interface FullCreditsPageProps {}

const FullCreditsPage: React.FC<FullCreditsPageProps> = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { mediaType, id } = useParams();
  const [credits, setCredits] = useState<Credits>({cast: [], crew: []});


  const fetchMediaCredits = async () => {
    const credits = await getMediaCredits(id, mediaType);
    setCredits(credits);
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
          {credits.cast?.map((person: Person) => (
            <Col key={uniqid()} lg={2} md={4} sm={6} xs={6}>
              <PersonCard person={person} />
            </Col>
          ))}
        </Row>
        <h2 className="text-center mt-5 mb-5">Crew</h2>
        <Row>
          {credits.crew?.map((person: Person) => (
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
