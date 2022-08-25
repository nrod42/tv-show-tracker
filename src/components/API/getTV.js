const getTopTV = async (page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      { mode: "cors" }
    );
    const top = await response.json();

    return top.results
      .filter((show) => show.original_language === "en")
      .map((show) => ({
        id: show.id,
        poster: `https://image.tmdb.org/t/p/w185/${show.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
        title: show.name,
        rating: show.vote_average,
        year: show.first_air_date,
        plot: show.overview,
        genre: show.genre_ids,
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

    return pop.results
      .filter((show) => show.original_language === "en")
      .map((show) => ({
        id: show.id,
        poster: `https://image.tmdb.org/t/p/w185/${show.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
        title: show.name,
        rating: show.vote_average,
        year: show.first_air_date,
        plot: show.overview,
        genre: show.genre_ids,
      }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getAiringTodayTV = async (page = 1) => {
  try {
    const response = await fetch(
      ` https://api.themoviedb.org/3/tv/airing_today?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=${page}`,
      {
        mode: "cors",
      }
    );
    const latest = await response.json();
    return latest.results
      .filter((show) => show.original_language === "en")
      .map((show) => ({
        id: show.id,
        poster: `https://image.tmdb.org/t/p/w185/${show.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
        title: show.name,
        rating: show.vote_average,
        year: show.first_air_date.split("-")[0],
        plot: show.overview,
        genre: show.genre_ids,
      }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getTVResults = async (value, setState) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1&query=${value}&include_adult=true`,
      { mode: "cors" }
    );
    const tvShows = await response.json();
    setState(
      tvShows.results
        .filter((show) => show.original_language === "en")
        .map((show) => ({
          id: show.id,
          poster: `https://image.tmdb.org/t/p/w185/${show.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
          title: show.name,
          rating: show.vote_average,
          year: show.first_air_date,
          plot: show.overview,
          genre: show.genre_ids,
        }))
    );
  } catch (error) {
    console.error("Error:API", error);
  }
};

export { getTopTV, getPopularTV, getAiringTodayTV, getTVResults };
