import { Link } from "react-router-dom";
import defaultImg from "../img/defaultImg.webp";
import AddToListBtn from "./AddToListBtn";

const Card = (props) => {
  const { id, poster, title, rating, year } = props.showData;
  const {
    setWatchingList,
    setWantToWatchList,
    setCompletedList,
    setDroppedList,
    setShowPage,
  } = props;

  const handleShowPage = () => {
    setShowPage(props.showData);
  };

  return (
    <div className="card">
      <div className="mainCardContent" onClick={handleShowPage}>
        <div className="posterWrapper">
          <Link to={`/shows/id:${id}`}>
            <img
              className="cardImg"
              src={poster !== null ? poster : defaultImg}
              alt={`${title} poster`}
            ></img>
          </Link>
          <AddToListBtn
            setWatchingList={setWatchingList}
            setWantToWatchList={setWantToWatchList}
            setCompletedList={setCompletedList}
            setDroppedList={setDroppedList}
            showData={props.showData}
          />
        </div>

        <h3 className="title">{title}</h3>
        <p>({year})</p>
        <p className="rating">Rating: {rating}/10</p>
      </div>
    </div>
  );
};

export default Card;
