const getLatestTVData = async () => {
    try {
      const response = await fetch(
        ` https://api.themoviedb.org/3/tv/airing_today?api_key=4a82fad1143aa1a462a2f120e4923710&language=en-US&page=1`,
        {
          mode: "cors",
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error:API", error);
    }
};


export {getLatestTVData}