import { useState } from "react";
import { getActorPics } from "./API/getTV";
// import defaultImg from "../img/defaultImg.webp";

const PersonCard = (props) => {
  const { id, name, character } = props.person;

  const [actorPic, setActorPic] = useState("");

(async () => {
  const actorPic = await getActorPics(id);
  setActorPic(actorPic);
})();

  return (
    <div className="personCard">
      <img className="personPic" src={actorPic} alt={`${name}`}></img>
      <p>{name}</p>
      <p>{character}</p>
    </div>
  );
};

export default PersonCard;
