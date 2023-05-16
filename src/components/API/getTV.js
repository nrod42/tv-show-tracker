const API_KEY = "4a82fad1143aa1a462a2f120e4923710";
// import dotenv from 'dotenv';
// dotenv.config();
// const API_KEY = process.env.API_KEY

const fetchShows = async (url) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();

    return data.results
    // .filter((show) => show.original_language === "en")
    .map((show) => ({
      id: show.id,
      poster: `https://image.tmdb.org/t/p/w185/${show.poster_path}`,
      title: show.name,
      rating: show.vote_average,
      year: show.first_air_date.split("-")[0],
      type: "tv",
    }));
  } catch (error) {
    console.error("Error:API", error);
  }
};


const getTopTV = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchShows(url);
};

const getPopularTV = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchShows(url);
};

const getAiringTodayTV = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchShows(url);
};

const getShowDetails = async (showId) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, { mode: "cors" });
    const tvShow = await response.json();

    return {
      id: tvShow.id,
      poster: `https://image.tmdb.org/t/p/w300/${tvShow.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original/${tvShow.backdrop_path}`,
      title: tvShow.name,
      genres: tvShow.genres ? tvShow.genres.map((genre, index) => index < tvShow.genres.length - 1 ? `${genre.name}, ` : genre.name).join("") : null,
      seasonNum: tvShow.number_of_seasons,
      episodeNum: tvShow.number_of_episodes,
      rating: tvShow.vote_average,
      plot: tvShow.overview,
      year: tvShow.first_air_date.split("-")[0],
      seasonsInfo: tvShow.seasons,
      type: "tv",
    };
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getShowCredits = async (showId) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${API_KEY}&language=en-US`;
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
    return `https://image.tmdb.org/t/p/w185/${pic.profiles[0]?.file_path}`;
  } catch (error) {
    console.error("Error: getTVActorPics", error);
  }
};

const getSimilarShows = async (showId, page = 1) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${showId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url,{  mode: "cors" });
    const similar = await response.json();

    return similar.results.map((show) => ({
      id: show.id,
      poster: `https://image.tmdb.org/t/p/w185/${show.poster_path}`,
      title: show.name,
      rating: show.vote_average,
      year: show.first_air_date.split("-")[0],
      type: "tv",
    }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getRecTV = async (showId, page = 1) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url, {  mode: "cors" });
    const rec = await response.json();
    return (
      rec.results
        .filter((show) => show.original_language === "en")
        .map((show) => ({
          id: show.id,
          poster: `https://image.tmdb.org/t/p/w185/${show.poster_path}`,
          title: show.name,
          rating: show.vote_average,
          year: show.first_air_date.split("-")[0],
          type: "tv",
        }))
    );
  } catch (error) {
    console.error("Error:API", error);
  }
};

// Get TV Show trailer by passing TV show ID
const getShowTrailer = async (showId) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, { mode: "cors" });
    const trailer = await response.json();
    return trailer.results.filter((vid) => vid.type === "Trailer")[0]?.key;
  } catch (error) {
    console.error("Error:API", error);
  }
};

export {
  getTopTV,
  getPopularTV,
  getAiringTodayTV,
  getShowDetails,
  getShowCredits,
  getActorPics,
  getSimilarShows,
  getRecTV,
  getShowTrailer,
};
