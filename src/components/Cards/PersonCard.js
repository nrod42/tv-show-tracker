import { useEffect, useState } from "react";
import { getActorPics } from "../API/getTV";
import Card from "react-bootstrap/Card";
import defaultImg from "../../img/defaultImg.webp";

const PersonCard = (props) => {
  const { id, name, character } = props.person;

  const [actorPic, setActorPic] = useState("");

  useEffect(() => {
    (async () => {
      const actorPic = await getActorPics(id);
      setActorPic(actorPic);
    })();
  }, [id]);

  return (
    <Card
      bg="light"
      style={{
        textAlign: "center",
        minWidth: "185px",
        width: "185px",
        border: "none",
      }}
    >
      <Card.Img
        variant="top"
        style={{ height: "278px" }}
        src={actorPic !== null ? actorPic : defaultImg}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{character}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default PersonCard;
