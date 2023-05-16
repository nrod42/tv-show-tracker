const API_KEY = "4a82fad1143aa1a462a2f120e4923710";

const fetchMovies = async (url) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    console.log(data)
    return data.results
    // .filter((movie) => movie.original_language === "en")
    .map((movie) => ({
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      title: movie.title,
      rating: movie.vote_average,
      year: movie.release_date.split("-")[0],
      type: "movie",
    }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getTopMovies = (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMovies(url);
};

const getPopularMovies = (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMovies(url);
};

const getUpcomingMovies = (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMovies(url);
};

const getNowPlayingMovies = (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMovies(url);
};

const getMovieDetails = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, { mode: "cors" });
    const movie = await response.json();

    return {
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
      title: movie.title,
      genres: movie.genres
        ? movie.genres
            .map(
              (genre, index) =>
                index < movie.genres.length - 1 ? `${genre.name}, ` : genre.name
            )
            .join("")
        : null,
      runtime: movie.runtime,
      rating: movie.vote_average,
      plot: movie.overview,
      year: movie.release_date,
      type: "movie",
    };
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getMovieCredits = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US&language=en-US`;
    const response = await fetch(url, { mode: "cors" });
    const credits = await response.json();

    return {
      cast: credits.cast,
      crew: credits.crew,
    };
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getActorPics = async (id) => {
  try {
    const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`;
    const response = await fetch(url, { mode: "cors" });
    const pic = await response.json();
    return `https://image.tmdb.org/t/p/w185/${pic.profiles[0].file_path}`;
  } catch (error) {
    console.error("Error: getActorPics", error);
  }
};

const getSimilarMovies = async (movieId, page = 1) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url, { mode: "cors" });
    const similar = await response.json();

    return similar.results.map((movie) => ({
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      title: movie.title,
      rating: movie.vote_average,
      year: movie.release_date.split("-")[0],
      type: "movie",
    }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getRecMovies = async (movieId, page = 1) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language&en-US&language=en-US&page=${page}`;
    const response = await fetch(url, { mode: "cors" });
    const rec = await response.json();

    return rec.results.map((movie) => ({
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      title: movie.title,
      rating: movie.vote_average,
      year: movie.release_date.split("-")[0],
      type: "movie",
    }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getMovieTrailer = async (showId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${showId}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, { mode: "cors" });
    const trailer = await response.json();

    return trailer.results.filter((vid) => vid.type === "Trailer")[0]?.key;
  } catch (error) {
    console.error("Error:API", error);
  }
};

export {
  getTopMovies,
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieDetails,
  getMovieCredits,
  getActorPics,
  getSimilarMovies,
  getRecMovies,
  getMovieTrailer,
};
