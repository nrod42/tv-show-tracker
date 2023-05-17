// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY='4a82fad1143aa1a462a2f120e4923710'

const fetchMedia = async (url, type) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const {results} = await response.json();

    return results.map((media) => ({
      id: media.id || '',
      poster: `https://image.tmdb.org/t/p/w185/${media.poster_path || 'default_poster_path.jpg'}`,
      title: media.title || media.name || 'Unknown',
      rating: media.vote_average || 0,
      year: (media.release_date || media.first_air_date || '').split('-')[0], // Use empty string as default value if release_date and first_air_date are undefined
      type,
    }));
  } catch (error) {
    console.error("Error:API", error);
  }
};

const getTopMedia = (type, page = 1) => {
    const mediaType = type === 'movie' ? 'movie' : 'tv';
    const url = `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    return fetchMedia(url, type);
  };
  
const getPopularMedia = (type, page = 1) => {
    const mediaType = type === 'movie' ? 'movie' : 'tv';
    const url = `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    return fetchMedia(url, type);
};

const getAiringTodayTV = (page = 1) => {
    const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`;
    return fetchMedia(url, 'tv');
};

const getUpcomingMovies = (page = 1) => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
    return fetchMedia(url, 'movie');
};

const getNowPlayingMovies = (page = 1) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
    return fetchMedia(url, 'movie');
};

const getMediaDetails = async (id, type) => {
    try {
      const mediaType = type === 'movie' ? 'movie' : 'tv';
      const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`;
      const response = await fetch(url, { mode: "cors" });
      const media = await response.json();
  
      const details = {
        id: media.id,
        poster: `https://image.tmdb.org/t/p/w300/${media.poster_path || ''}`,
        backdrop: `https://image.tmdb.org/t/p/original/${media.backdrop_path || 'default_poster_path.jpg'}`,
        title: media.title || media.name,
        genres: media.genres
          ? media.genres
              .map(
                (genre, index) =>
                  index < media.genres.length - 1 ? `${genre.name}, ` : genre.name
              )
              .join("")
          : null,
        rating: media.vote_average,
        plot: media.overview,
        year: (media.release_date || media.first_air_date || '').split('-')[0], // Use empty string as default value if release_date and first_air_date are undefined
        type: mediaType,
      };
  
      if (type === 'movie') {
        details.runtime = media.runtime;
      } else if (type === 'tv') {
        details.seasonNum = media.number_of_seasons;
        details.episodeNum = media.number_of_episodes;
        details.seasonsInfo = media.seasons;
      }
  
      return details;
    } catch (error) {
      console.error("Error:API", error);
    }
  };
  

const getMediaCredits = async (mediaId, type) => {
    try {
      const mediaType = type === 'movie' ? 'movie' : 'tv';
      const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=${API_KEY}&language=en-US&language=en-US`;
      const response = await fetch(url, { mode: "cors" });
      const credits = await response.json();
  
      return {
        cast: credits.cast,
        crew: credits.crew,
      };
    } catch (error) {
      console.error("Error:API getMediaCredits", error);
    }
  };

const getActorPics = async (id) => {
    try {
        const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`;
        const response = await fetch(url, { mode: "cors" });
        const pic = await response.json();
        return `https://image.tmdb.org/t/p/w185/${pic.profiles[0]?.file_path}`;
    } catch (error) {
        console.error("Error: getActorPics", error);
    }
};

const getSimilarMedia = async (mediaId, type, page = 1) => {
    try {
      const mediaType = type === 'movie' ? 'movie' : 'tv';
      const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`;
      const response = await fetch(url, { mode: 'cors' });
      const similar = await response.json();

      return similar.results.map((media) => ({
        id: media.id || '', // Use empty string as default value if id is undefined
        poster: `https://image.tmdb.org/t/p/w185/${media.poster_path || 'default_poster_path.jpg'}`,
        title: media.title || media.name || 'Unknown', // Use 'Unknown' as default value if title and name are undefined
        rating: media.vote_average || 0, // Use 0 as default value if vote_average is undefined
        year: (media.release_date || media.first_air_date || '').split('-')[0], // Use empty string as default value if release_date and first_air_date are undefined
        type: mediaType || '', // Use empty string as default value if mediaType is undefined
      }));
    } catch (error) {
      console.error('Error:API getSimilarMedia', error);
    }
};

const getRecMedia = async (movieId, type, page = 1) => {
    try {
      const mediaType = type === 'movie' ? 'movie' : 'tv';
      const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}/recommendations?api_key=${API_KEY}&language&en-US&language=en-US&page=${page}`;
      const response = await fetch(url, { mode: "cors" });
      const rec = await response.json();
  
      return rec.results.map((media) => ({
        id: media.id || '',
        poster: `https://image.tmdb.org/t/p/w185/${media.poster_path || 'default_poster_path.jpg'}`,
        title: media.title || media.name || 'Unknown', 
        rating: media.vote_average || 0,
        year: (media.release_date || media.first_air_date || '').split('-')[0], // Use empty string as default value if release_date and first_air_date are undefined
        type: mediaType || '',
      }));
    } catch (error) {
      console.error("Error:API getRecMedia", error);
    }
};

const getMediaTrailer = async (mediaId, type) => {
    try {
        const mediaType = type === 'movie' ? 'movie' : 'tv';
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(url, { mode: "cors" });
        const trailer = await response.json();

        return trailer.results.filter((vid) => vid.type === "Trailer")[0]?.key;
    } catch (error) {
        console.error("Error:API getMediaTrailer", error);
    }
};

export { getTopMedia, getPopularMedia, getAiringTodayTV, getUpcomingMovies, getNowPlayingMovies, getMediaDetails, getMediaCredits, getActorPics, getSimilarMedia, getRecMedia, getMediaTrailer };


