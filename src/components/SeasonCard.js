import defaultImg from "../img/defaultImg.webp";

const SeasonCard = (props) => {
  const { id, season_number, episode_count, poster_path } = props.season;

// const season = props.season.season_number;
// const episodes = props.season.episode_count;
// const poster = `https://image.tmdb.org/t/p/w300/${props.season.poster_path}`;



  return (
    <div className="seasonCard">
      <div>
      <p> {season_number === 0 ? "Specials" : `Season ${season_number}`}</p>
        <img
          className="seasonPoster"
          src={
            poster_path !== null
              ? `https://image.tmdb.org/t/p/w300/${props.season.poster_path}`
              : defaultImg
          }
          alt={`Season ${season_number} poster`}
        ></img>
      </div>
      <p> Episodes: {episode_count}</p>
    </div>
  );
};

export default SeasonCard;
