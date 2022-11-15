const getTopMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      { mode: "cors" }
    );
    const top = await response.json();

    return (
      top.results
        .map((movie) => ({
          id: movie.id,
          poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
          title: movie.title,
          rating: movie.vote_average,
          year: movie.release_date.split("-")[0],
          type: "movie",
        }))
    );
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      { mode: "cors" }
    );
    const pop = await response.json();

    return (
      pop.results
        .map((movie) => ({
          id: movie.id,
          poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
          title: movie.title,
          rating: movie.vote_average,
          year: movie.release_date.split("-")[0],
          type: "movie",
        }))
    );
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      { mode: "cors" }
    );
    const upcoming = await response.json();

    return (
      upcoming.results
        .map((movie) => ({
          id: movie.id,
          poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
          title: movie.title,
          rating: movie.vote_average,
          year: movie.release_date.split("-")[0],
          type: "movie",
        }))
    );
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      { mode: "cors" }
    );
    const nowPlaying = await response.json();

    return (
      nowPlaying.results
        // .filter((movie) => movie.original_language === "en")
        .map((movie) => ({
          id: movie.id,
          poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
          title: movie.title,
          rating: movie.vote_average,
          year: movie.release_date.split("-")[0],
          type: "movie",
        }))
    );
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
      {
        mode: "cors",
      }
    );
    const movie = await response.json();
    return {
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
      title: movie.title,
      genres: movie.genres
        ? movie.genres.map((genre) => `${genre.name}, `)
        : "",
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
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&language=en-US`,
      {
        mode: "cors",
      }
    );
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
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=4a82fad1143aa1a462a2f120e4923710`,
      {
        mode: "cors",
      }
    );
    const pic = await response.json();
    return `https://image.tmdb.org/t/p/w185/${pic.profiles[0]?.file_path}`;
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getSimilarMovies = async (movieId, page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      {
        mode: "cors",
      }
    );
    const similar = await response.json();
    return (
      similar.results
        .map((movie) => ({
          id: movie.id,
          poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
          title: movie.title,
          rating: movie.vote_average,
          year: movie.release_date.split("-")[0],
          type: "movie",
        }))
    );
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getRecMovies = async (movieId, page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=4a82fad1143aa1a462a2f120e4923710&language&en-US&language=en-US&page=${page}`,
      {
        mode: "cors",
      }
    );
    const rec = await response.json();
    return (
      rec.results
        .map((movie) => ({
          id: movie.id,
          poster: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
          title: movie.title,
          rating: movie.vote_average,
          year: movie.release_date.split("-")[0],
          type: "movie",
        }))
    );
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getMovieTrailer = async (showId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${showId}/videos?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
      {
        mode: "cors",
      }
    );
    const trailer = await response.json();
    return trailer.results.filter((vid) => vid.type === "Trailer")[0].key;
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
