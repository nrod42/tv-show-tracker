
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

// Fetches media data from a given URL and type, filters by language, and maps the results
const fetchMedia = async (url: string, type: string) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const { results } = await response.json();

    // Filter and map the fetched results
    return results
      .filter(
        (media) =>
          media.original_language === "en" || media.original_language === "ja"
      )
      .map((media) => ({
        id: media.id || "",
        poster: media.poster_path
          ? `https://image.tmdb.org/t/p/w342/${media.poster_path}`
          : null,
        title: media.title || media.name || "Unknown",
        rating: media.vote_average || 0,
        year: (media.release_date || media.first_air_date || "").split("-")[0], // Extract year from release_date or first_air_date
        type,
      }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

// Get top-rated media based on type and page
const getTopMedia = (type: string, page = 1) => {
  const mediaType = type === "movie" ? "movie" : "tv";
  const url = `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMedia(url, type);
};

// Get popular media based on type and page
const getPopularMedia = (type, page = 1) => {
  const mediaType = type === "movie" ? "movie" : "tv";
  const url = `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMedia(url, type);
};

// Get TV shows airing today based on page
const getAiringTodayTV = (page = 1) => {
  const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMedia(url, "tv");
};

// Get upcoming movies based on page
const getUpcomingMovies = (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&region=US&page=${page}`;
  return fetchMedia(url, "movie");
};

// Get currently playing movies based on page
const getNowPlayingMovies = (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMedia(url, "movie");
};


export {
  getTopMedia,
  getPopularMedia,
  getAiringTodayTV,
  getUpcomingMovies,
  getNowPlayingMovies,
};
