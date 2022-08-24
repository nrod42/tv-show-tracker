// import { getTopTVData } from "./getTVData";

const getTopTV = async (setState) => {
  const urls = [
    `https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1`,
    `https://api.themoviedb.org/3/tv/top_rated?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=2`,
  ];
  Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
    .then((allResponses) => {
      const results = allResponses.map((response) => response.results);
      const topShows = [].concat.apply([], results);

      setState(
        topShows
          .filter((show) => show.original_language === "en")
          .map((show) => ({
            id: show.id,
            poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
            title: show.name,
            rating: show.vote_average,
            year: show.first_air_date.split("-")[0],
            plot: show.overview,
            genre: show.genre_ids,
          }))
      );
    })
    .catch((error) => {
      console.error("Error:API", error);
    });
};

const getPopularTV = async (setState) => {
  const urls = [
    `https://api.themoviedb.org/3/tv/popular?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1`,
    `https://api.themoviedb.org/3/tv/popular?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=2`,
  ];
  Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
    .then((allResponses) => {
      const results = allResponses.map((response) => response.results);
      const popular = [].concat.apply([], results);

      setState(
        popular
          .filter((show) => show.original_language === "en")
          .map((show) => ({
            id: show.id,
            poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
            title: show.name,
            rating: show.vote_average,
            year: show.first_air_date.split("-")[0],
            plot: show.overview,
            genre: show.genre_ids,
          }))
      );
    })
    .catch((error) => {
      console.error("Error:API", error);
    });
};

const getLatestTV = async (setState) => {
  try {
    const response = await fetch(
      ` https://api.themoviedb.org/3/tv/airing_today?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1`,
      {
        mode: "cors",
      }
    );
    const latest = await response.json();
    setState(
      latest.results
        .filter((show) => show.original_language === "en")
        .map((show) => ({
          id: show.id,
          poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
          title: show.name,
          rating: show.vote_average,
          year: show.first_air_date.split("-")[0],
          plot: show.overview,
          genre: show.genre_ids,
        }))
    );
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
          poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
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

export { getTopTV, getPopularTV, getLatestTV, getTVResults };
