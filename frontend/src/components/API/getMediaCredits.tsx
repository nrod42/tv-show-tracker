
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

interface MediaCredits {
    cast: any[];
    crew: any[];
}

// Get credits for a specific media item
const getMediaCredits = async (mediaId: string, type: string): Promise<MediaCredits> => {
    try {
        const mediaType = type === "movie" ? "movie" : "tv";
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=${API_KEY}&language=en-US&language=en-US`;
        const response = await fetch(url, { mode: "cors" });

        if (!response.ok) {
            throw new Error("Failed to fetch media credits");
        }

        const credits: MediaCredits = await response.json();
        return credits;
    } catch (error) {
        console.error("Error:API getMediaCredits", error);
        throw new Error('Failed to fetch media credits');
    }
};

export default getMediaCredits;