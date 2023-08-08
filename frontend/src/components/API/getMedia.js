// Import the API key from the environment variables
const API_KEY = process.env.REACT_APP_API_KEY;

// Fetches media data from a given URL and type, filters by language, and maps the results
const fetchMedia = async (url, type) => {
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
const getTopMedia = (type, page = 1) => {
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
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMedia(url, "movie");
};

// Get currently playing movies based on page
const getNowPlayingMovies = (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchMedia(url, "movie");
};

// Get detailed information about a specific media item
const getMediaDetails = async (id, type) => {
  try {
    const mediaType = type === "movie" ? "movie" : "tv";
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, { mode: "cors" });
    const media = await response.json();
    const details = {
      id: media.id,
      poster: media.poster_path
        ? `https://image.tmdb.org/t/p/w500/${media.poster_path}`
        : null,
      backdrop: media.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${media.backdrop_path}`
        : null,
      title: media.title || media.name,
      genres: media.genres
        ? media.genres.map((genre) => genre.name).join(", ")
        : null,
      rating: media.vote_average,
      plot: media.overview,
      year: (media.release_date || media.first_air_date || "").split("-")[0], // Extract year from release_date or first_air_date
      type: mediaType,
    };

    // Additional details based on media type
    if (type === "movie") {
      details.runtime = media.runtime;
    } else if (type === "tv") {
      details.seasonNum = media.number_of_seasons;
      details.episodeNum = media.number_of_episodes;
      details.seasonsInfo = media.seasons;
      details.createdBy = media.created_by;
    }
    return details;
  } catch (error) {
    console.error("Error:API", error);
  }
};

// Get credits for a specific media item
const getMediaCredits = async (mediaId, type) => {
  try {
    const mediaType = type === "movie" ? "movie" : "tv";
    const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=${API_KEY}&language=en-US&language=en-US`;
    const response = await fetch(url, { mode: "cors" });
    const credits = await response.json();
    return {
      cast: credits.cast,
      crew: credits.crew,
    };
  } catch (error) {
    console.error("Error:API getMediaCredits", error);
  }
};

// Get information about a specific actor
const getActorInfo = async (actorId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch actor information");
    }
    return await response.json();
  } catch (error) {
    console.error("Error: getActorInfo", error);
    // Handle error case, such as displaying an error message or fallback data
    return {};
  }
};

// Get roles of a specific actor
const getActorRoles = async (actorId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch actor information");
    }
    const roles = await response.json();
    const data = roles.cast.map((role) => ({
      id: role.id || "",
      poster: role.poster_path
        ? `https://image.tmdb.org/t/p/w45/${role.poster_path}`
        : null,
      title: role.title || role.name || "Unknown",
      role: role.character,
      rating: role.vote_average || 0,
      year: (role.release_date || role.first_air_date || "").split("-")[0], // Extract year from release_date or first_air_date
      type: role.media_type,
    }));
    return data;
  } catch (error) {
    console.error(error);
    // Handle error case, such as displaying an error message or fallback data
    return {};
  }
};

// Get pictures of a specific actor
const getActorPics = async (id) => {
  try {
    const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`;
    const response = await fetch(url, { mode: "cors" });
    const pic = await response.json();
    return pic.profiles[0]
      ? `https://image.tmdb.org/t/p/w342/${pic.profiles[0].file_path}`
      : null;
  } catch (error) {
    console.error("Error: getActorPics", error);
  }
};

// Get media similar to a specific media item
const getSimilarMedia = async (mediaId, type, page = 1) => {
  try {
    const mediaType = type === "movie" ? "movie" : "tv";
    const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url, { mode: "cors" });
    const similar = await response.json();

    return similar.results.map((media) => ({
      id: media.id || "",
      poster: media.poster_path
        ? `https://image.tmdb.org/t/p/w342/${media.poster_path}`
        : null,
      title: media.title || media.name || "Unknown", // Use 'Unknown' as default value if title and name are undefined
      rating: media.vote_average || 0, // Use 0 as default value if vote_average is undefined
      year: (media.release_date || media.first_air_date || "").split("-")[0], // Extract year from release_date or first_air_date
      type: mediaType || "", // Use empty string as default value if mediaType is undefined
    }));
  } catch (error) {
    console.error("Error:API getSimilarMedia", error);
  }
};

// Get recommended media for a specific media item
const getRecMedia = async (movieId, type, page = 1) => {
  try {
    const mediaType = type === "movie" ? "movie" : "tv";
    const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}/recommendations?api_key=${API_KEY}&language&en-US&language=en-US&page=${page}`;
    const response = await fetch(url, { mode: "cors" });
    const rec = await response.json();
    return rec.results.map((media) => ({
      id: media.id || "",
      poster: media.poster_path
        ? `https://image.tmdb.org/t/p/w342/${media.poster_path}`
        : null,
      title: media.title || media.name || "Unknown",
      rating: media.vote_average || 0,
      year: (media.release_date || media.first_air_date || "").split("-")[0], // Extract year from release_date or first_air_date
      type: mediaType || "",
    }));
  } catch (error) {
    console.error("Error:API getRecMedia", error);
  }
};

// Get trailer video key for a specific media item
const getMediaTrailer = async (mediaId, type) => {
  try {
    const mediaType = type === "movie" ? "movie" : "tv";
    const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, { mode: "cors" });
    const trailer = await response.json();

    return trailer.results.filter((vid) => vid.type === "Trailer")[0]?.key;
  } catch (error) {
    console.error("Error:API getMediaTrailer", error);
  }
};

// Search for media items based on a query
const getResults = async (query) => {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
    const response = await fetch(url, { mode: "cors" });
    const { results } = await response.json();
    return results.map((result) => ({
      id: result.id,
      poster: result.poster_path
        ? `https://image.tmdb.org/t/p/w342/${result.poster_path}`
        : null,
      title: result.media_type === "movie" ? result.title : result.name,
      rating: result.vote_average,
      year:
        result.media_type === "movie"
          ? result.release_date?.split("-")[0]
          : result.first_air_date?.split("-")[0],
      genre: result.genre_ids,
      type: result.media_type,
    }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

export {
  getTopMedia,
  getPopularMedia,
  getAiringTodayTV,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMediaDetails,
  getMediaCredits,
  getActorInfo,
  getActorRoles,
  getActorPics,
  getSimilarMedia,
  getRecMedia,
  getMediaTrailer,
  getResults,
};
