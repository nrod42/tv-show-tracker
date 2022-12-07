const getTopTV = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      { mode: "cors" }
    );
    const top = await response.json();

    return top.results.map((show) => ({
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

const getPopularTV = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      { mode: "cors" }
    );
    const pop = await response.json();

    return pop.results.map((show) => ({
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

const getAiringTodayTV = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      {
        mode: "cors",
      }
    );
    const latest = await response.json();
    return latest.results.map((show) => ({
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

const getShowDetails = async (showId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
      {
        mode: "cors",
      }
    );
    const tvShow = await response.json();
    return {
      id: tvShow.id,
      poster: `https://image.tmdb.org/t/p/w300/${tvShow.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original/${tvShow.backdrop_path}`,
      title: tvShow.name,
      genres: tvShow.genres
        ? tvShow.genres.map((genre) => `${genre.name}, `)
        : "",
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
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
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
    return `https://image.tmdb.org/t/p/w185/${pic.profiles[0].file_path}`;
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getSimilarShows = async (showId, page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}/similar?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      {
        mode: "cors",
      }
    );
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
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      {
        mode: "cors",
      }
    );
    const rec = await response.json();
    // console.log(rec)
    return (
      rec.results
        // .filter((movie) => movie.original_language === "en")
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
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}/videos?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US`,
      {
        mode: "cors",
      }
    );
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
