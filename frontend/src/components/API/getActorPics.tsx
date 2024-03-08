
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

// Get pictures of a specific actor
const getActorPics = async (id: string): Promise<string | null> => {
    try {
      const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`;
      const response = await fetch(url, { mode: "cors" });
      const pic = await response.json();
  
      return pic.profiles[0]
        ? `https://image.tmdb.org/t/p/w342/${pic.profiles[0].file_path}`
        : null;
    } catch (error) {
      console.error("Error: getActorPics", error);
      return null;
    }
  };

export default getActorPics;