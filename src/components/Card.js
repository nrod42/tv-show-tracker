import React from "react";

const Card = (props) => {
  const { image, name, rating, summary, id } = props.showData;
  //   const setMyList = props.setMyList;

  return (
    <div className="card">
      <div className="collapsible">
        <img
          className="cardImg"
          src={image.medium}
          alt={`${name} poster`}
        ></img>
        <p className="title">{name}</p>
        <p className="rating">{rating.average}</p>
      </div>
      <div className="summary">{summary}</div>
      <button className="addToListBtn">Add</button>
      <button className="removeFromListBtn">Remove</button>
    </div>
  );
};

export default Card;
