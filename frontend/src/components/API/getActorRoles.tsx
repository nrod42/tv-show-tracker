
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

interface Role {
    id: string;
    poster: string | null;
    title: string;
    role: string;
    rating: string;
    year: string;
    type: string;
  }
  
// Get roles of a specific actor
const getActorRoles = async (actorId: string): Promise<Role[]> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch actor information");
      };
  
      const roles = await response.json();
      const data: Role[] = roles.cast.map((role: any) => ({
        id: role.id || "",
        poster: role.poster_path
          ? `https://image.tmdb.org/t/p/w45/${role.poster_path}`
          : null,
        title: role.title || role.name || "Unknown",
        role: role.character,
        rating: role.vote_average || 0,
        year: (role.release_date || role.first_air_date || "").split("-")[0], // Extract year from release_date or first_air_date
        type: role.media_type,
      }));
      return data;
    } catch (error) {
      console.error(error);
      
      return [];
    }
};

export default getActorRoles;