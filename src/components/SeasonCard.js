import defaultImg from "../img/defaultImg.webp";

const SeasonCard = (props) => {
  const { id, season_number, episode_count, poster_path } = props.season;

  return (
    <div className="seasonCard">
      <img
        className="seasonPoster"
        src={
          poster_path !== null
            ? `https://image.tmdb.org/t/p/w300/${props.season.poster_path}`
            : defaultImg
        }
        alt={`Season ${season_number} poster`}
      ></img>
      <p>{season_number === 0 ? "Specials" : `Season ${season_number}`}</p>
      <p>{episode_count} episodes</p>
    </div>
  );
};

export default SeasonCard;
