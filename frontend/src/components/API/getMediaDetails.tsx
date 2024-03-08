
// Import the API key from the environment variables
const API_KEY = '4a82fad1143aa1a462a2f120e4923710';

interface Media {
    id: string;
    poster: string | null;
    backdrop: string | null;
    title: string;
    genres: string | null;
    rating: string;
    plot: string;
    year: string;
    type: string;
}

interface Movie extends Media {
    runtime: string;
}

interface TVShow extends Media {
    seasonNum: string;
    episodeNum: string;
    seasonsInfo?: any[];
    createdBy?: any[]; 
}

type MediaDetails = Movie | TVShow;

const getCommonDetails = (media: any, type: string): Media => {
    return {
        id: media.id,
        poster: media.poster_path ? `https://image.tmdb.org/t/p/w500/${media.poster_path}` : null,
        backdrop: media.backdrop_path ? `https://image.tmdb.org/t/p/original/${media.backdrop_path}` : null,
        title: media.title || media.name,
        genres: media.genres ? media.genres.map((genre: any) => genre.name).join(', ') : null,
        rating: media.vote_average,
        plot: media.overview,
        year: (media.release_date || media.first_air_date || '').split('-')[0],
        type,
    };
};
  
// Get detailed information about a specific media item
const getMediaDetails = async (id: string, type: string): Promise<MediaDetails> => {
    try {
        const mediaType = type === "movie" ? "movie" : "tv";
        const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(url, { mode: "cors" });
        const media = await response.json();

        // Additional details based on media type
        if (type === 'movie') {
        const movieDetails: Movie = {
            ...getCommonDetails(media, 'movie'),
            runtime: media.runtime,
        };
        return movieDetails;
        } else if (type === 'tv') {
            const tvShowDetails: TVShow = {
                ...getCommonDetails(media, 'tv'),
                seasonNum: media.number_of_seasons,
                episodeNum: media.number_of_episodes,
                seasonsInfo: media.seasons,
                createdBy: media.created_by,
            };
            return tvShowDetails;
        } else {
            throw new Error('Invalid media type');
        }
    } catch (error) {
        console.error("Error:API", error);
        throw new Error('Failed to fetch media details');
    }
};

export default getMediaDetails;