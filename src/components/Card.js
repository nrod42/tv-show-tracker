import React from "react";
import "../index.css";
import defaultImg from "../img/defaultImg.webp";

const Card = (props) => {
  const { image, name, rating, summary } = props.showData;
  const setMyList = props.setMyList;

  const handleAddToList = () => {
    setMyList((prevState) => [...prevState, props.showData]);
  };

  //   const collapse {
  //       maxHeight ? summary.style.maxHeight = null : summary.style.maxHeight = summary.scrollHeight + 'px';
  //     }

  // style={{ maxHeight ? : maxHeight = null : maxHeight = scrollHeight + 'px'}}
  //   }

  return (
    <div className="card">
      <div className="collapsible">
        <img
          className="cardImg"
          src={image !== null ? image.medium : defaultImg}
          alt={`${name} poster`}
        ></img>
        <p className="title">{name}</p>
        <p className="rating">Rating: {rating.average}/10</p>
      </div>
      <div className="summary">{summary}</div>
      <div className="cardBtns">
        <button onClick={handleAddToList} className="addToListBtn">
          Add
        </button>
        <button className="removeFromListBtn">Remove</button>
      </div>
    </div>
  );
};

export default Card;
