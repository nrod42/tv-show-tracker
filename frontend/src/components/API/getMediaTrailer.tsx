
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

// Get trailer video key for a specific media item
const getMediaTrailer = async (mediaId: string, type: string): Promise<string | null> => {
    try {
      const mediaType = type === "movie" ? "movie" : "tv";
      const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=${API_KEY}&language=en-US`;
      const response = await fetch(url, { mode: "cors" });
      const trailer = await response.json();

      const trailerKey = trailer.results.find((vid) => vid.type === "Trailer")?.key;
      return trailerKey || null;
    } catch (error) {
      console.error("Error:API getMediaTrailer", error);
      return null; // Return null in case of an error
    }
};

export default getMediaTrailer;