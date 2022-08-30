import { useEffect, useState } from "react";
import { getActorPics } from "./API/getTV";
import defaultImg from "../img/defaultImg.webp";

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
    <div className="personCard">
      <img
        className="personPic"
        src={actorPic !== null ? actorPic : defaultImg}
        alt={`${name}`}
      ></img>
      <p>{name}</p>
      <p>{character}</p>
    </div>
  );
};

export default PersonCard;
