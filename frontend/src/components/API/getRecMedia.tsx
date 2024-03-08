
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

// Get recommended media for a specific media item
interface RecMedia {
    id: string;
    poster: string | null;
    title: string;
    rating: string;
    year: string;
    type: string;
}

const getRecMedia = async (movieId: string,type: string,page = 1): Promise<RecMedia[]> => {
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
            year: (media.release_date || media.first_air_date || "").split("-")[0],
            type: mediaType || "",
        }));
    } catch (error) {
        console.error("Error:API getRecMedia", error);
        return []; // Return an empty array in case of an error
    }
};

export default getRecMedia;