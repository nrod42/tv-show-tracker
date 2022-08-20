import defaultImg from "../img/defaultImg.webp";

const SeasonCard = (props) => {
  const { season_number, episode_count, poster_path } = props.s;

  return (
    <div className="seasonCard">
      <div>
        <img
          className="seasonPoster"
          src={
            poster_path !== null
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : defaultImg
          }
          alt={`Season ${season_number} poster`}
        ></img>
      </div>
      <p> Season: {season_number}</p>
      <p> Episodes: {episode_count}</p>
    </div>
  );
};

export default SeasonCard;
