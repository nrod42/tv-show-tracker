const API_KEY = "4a82fad1143aa1a462a2f120e4923710";

const getResults = async (query) => {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query.replace(
      " ",
      "%20"
    )}&page=1&include_adult=false`;
    const response = await fetch(url, { mode: "cors" });
    const {results} = await response.json();
    return results.map((result) => ({
      id: result.id,
      poster: `https://image.tmdb.org/t/p/w185/${result.poster_path}`,
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

export { getResults };
