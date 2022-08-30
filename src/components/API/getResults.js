const getResults = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&query=${query}&page=1&include_adult=false`,
        { mode: "cors" }
      );
      const results = await response.json();
      console.log(results.results)
      return results.results
        .map((result) => ({
        id: result.id,
        poster: `https://image.tmdb.org/t/p/w185/${result.poster_path}`,
        title: result.media_type === 'movie' ? result.title : result.name,          
        rating: result.vote_average,
        year: result.media_type === 'movie' ? result.release_date.split("-")[0] : result.first_air_date.split("-")[0],
        genre: result.genre_ids,
        type: result.media_type,
        }))
    } catch (error) {
      console.error("Error:API", error);
    }
  };

  export {
    getResults,
  };