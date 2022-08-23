import { getLatestTVData } from "./getLatestTVData";

const getLatestTV = async (setState) => {
    let latest = await getLatestTVData()
    setState(latest.results.filter((show) => show.original_language === "en")
    .map((show) => ({
      id: show.id,
      poster: `https://image.tmdb.org/t/p/original/${show.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original/${show.backdrop_path}`,
      title: show.name,
      rating: show.vote_average,
      year: show.first_air_date.split("-")[0],
      plot: show.overview,
      genre: show.genre_ids,
    })))
}

export { getLatestTV };