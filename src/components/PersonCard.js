import { useState, useEffect } from "react";
// import defaultImg from "../img/defaultImg.webp";

const PersonCard = (props) => {
  const { id, name, character } = props.person;

  const [actorPic, setActorPic] = useState("");

  const getActorPics = async (id) => {
    try {
      const response = await fetch(
        ` https://api.themoviedb.org/3/person/${id}/images?api_key=4a82fad1143aa1a462a2f120e4923710`,
        {
          mode: "cors",
        }
      );
      const pic = await response.json();
      setActorPic(
        `https://image.tmdb.org/t/p/w300/${pic.profiles[0].file_path}`
      );
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  useEffect(() => {
    getActorPics(id);
  }, [id]);

  return (
    <div className="personCard">
      <img className="personPic" src={actorPic} alt={`${name}`}></img>

      <p>{name}</p>
      <p>{character}</p>
    </div>
  );
};

export default PersonCard;
