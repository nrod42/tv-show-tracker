
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

// Search for media items based on a query
interface SearchResult {
    id: string;
    poster: string | null;
    title: string;
    rating: number;
    year: string | null;
    genre: number[] | null;
    type: string;
  }
  
  const getResults = async (query: string): Promise<SearchResult[]> => {
    try {
      const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
      const response = await fetch(url, { mode: "cors" });
      const { results } = await response.json();
  
      const searchResults: SearchResult[] = results.map((result: any) => ({
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
  
      return searchResults;
    } catch (error) {
      console.error("Error:API", error);
      throw new Error('Failed to fetch search results'); // Throw an error to indicate failure
    }
  };

  export default getResults;