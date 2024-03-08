
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

// Get information about a specific actor
const getActorInfo = async (actorId: string): Promise<any> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch actor information");
      }
      return await response.json();
    } catch (error) {
      console.error("Error: getActorInfo", error);
      return {};
    }
};

export default getActorInfo;