// // import React, { useContext } from "react";
// import { Link } from "react-router-dom";

// import defaultImg from "../img/defaultImg.webp";
// import AddToListBtn from "./AddToListBtn";
// import RemoveFromListBtn from "./RemoveFromListBtn";

// const MovieCard = (props) => {
//   const { setShowPage } = useContext(SetListsContext);
//   const { id, poster, title, rating, year } = props.movieData;

//   const handleMoviePage = () => {
//     setMoviePage(props.movieData);
//   };

//   return (
//     <div className="card" onClick={handleMoviePage}>
//       <div className="posterWrapper">
//         <Link to={`/movies/id=${id}`}>
//           <img
//             className="cardImg"
//             src={poster !== null ? poster : defaultImg}
//             alt={`${title} poster`}
//           ></img>
//         </Link>
//         <AddToListBtn showData={props.movieData} />
//         <RemoveFromListBtn showData={props.movieData} />
//       </div>
//       <h3 className="title">{title}</h3>
//       <p>({year})</p>
//       <p className="rating">Rating: {rating}/10</p>
//     </div>
//   );
// };

// export default MovieCard;
