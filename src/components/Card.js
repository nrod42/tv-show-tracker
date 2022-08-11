import React from "react";
import Collapsible from "react-collapsible";
import "../index.css";
import defaultImg from "../img/defaultImg.webp";

const Card = (props) => {
  const { image, name, rating, summary } = props.showData;
  const { setMyList, isMyListActive } = props;

  const handleAddToList = () => {
    setMyList((prevState) => [...prevState, props.showData]);
  };

  return (
    <div className="card">
      <Collapsible
        trigger={
          <div className="mainCardContent">
            <img
              className="cardImg"
              src={image !== null ? image.medium : defaultImg}
              alt={`${name} poster`}
            ></img>
            <h3 className="title">{name}</h3>
            <p className="rating">Rating: {rating.average}/10</p>
          </div>
        }
      >
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>
      </Collapsible>
      <button
        onClick={handleAddToList}
        className={isMyListActive ? "hidden" : "addToListBtn"}
      >
        Add
      </button>
      <button className={isMyListActive ? "removeFromListBtn" : "hidden"}>
        Remove
      </button>
    </div>
  );
};

export default Card;
