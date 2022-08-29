import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SetListsContext } from "../App";
import defaultImg from "../img/defaultImg.webp";
import AddToListBtn from "./AddToListBtn";
import RemoveFromListBtn from "./RemoveFromListBtn";
import "./Styles/card.css";

const MovieCard = (props) => {
    const { setMoviePage } = useContext(SetListsContext);
    const { id, poster, title, rating, year } = props.movieData;
  
    const handleMoviePage = () => {
      setMoviePage(props.movieData);
    };
    
    return (
      <Link to={`/movies/id:${id}`}>
      <div className="card" onClick={handleMoviePage}>
        <div className="posterWrapper">
          
            <img
              className="cardImg"
              src={poster !== null ? poster : defaultImg}
              alt={`${title} poster`}
            ></img>
          
          <AddToListBtn data={props.movieData} />
          <RemoveFromListBtn data={props.movieData} />
        </div>
        <p className="cardTitle">{title}</p>
        <p>({year})</p>
        <p className="rating">Rating: {rating}/10</p>
      </div>
      </Link>
    );
  };

export default MovieCard;
