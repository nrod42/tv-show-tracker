// import React, { useEffect, useState } from "react";
// import MovieCard from "./MovieCard";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const MoviesPage = (props) => {
//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 8,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 3,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   const [topMovies, setTopMovies] = useState([]);
//   const [topMoviesCards, setTopMoviesCards] = useState([]);

//   const getTopMovies = async () => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1`,
//         {
//           mode: "cors",
//         }
//       );
//       const topMovies = await response.json();
//       setTopMovies(
//         topMovies.results
//           .filter((movie) => movie.original_language === "en")
//           .map((movie) => ({
//             id: movie.id,
//             poster: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
//             backdrop: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
//             title: movie.title,
//             rating: movie.vote_average,
//             year: movie.release_date.split("-")[0],
//             plot: movie.overview,
//             genre: movie.genre_ids,
//           }))
//       );
//       console.log(topMovies.results);
//     } catch (error) {
//       console.error("Error:API", error);
//     }
//   };

//   useEffect(() => {
//     getTopMovies();
//   }, []);

//   useEffect(() => {
//     setTopMoviesCards(
//       topMovies.map((movie) => <MovieCard key={movie.id} movieData={movie} />)
//     );
//   }, [topMovies]);

//   return (
//     <div className={""}>
//       <h1>Top Rated</h1>
//       {/* <Carousel
//         containerClass="carousel-container"
//         responsive={responsive}
//         swipeable={true}
//         draggable={true}
//         infinite={true}
//         // autoPlay={true}
//         // autoPlaySpeed={2000}
//         // transitionDuration={500}
//       > */}
//       {topMoviesCards}
//       {/* </Carousel> */}
//     </div>
//   );
// };
// export default MoviesPage;
