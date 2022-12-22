import Card from "react-bootstrap/Card";
import defaultImg from "../../img/defaultImg.webp";

const SeasonCard = (props) => {
  const { season_number, episode_count, poster_path } = props.season;

  return (
    <Card
      bg="light"
      style={{
        textAlign: "center",
        minWidth: "185px",
        width: "185px",
        border: "none",
      }}
    >
      <Card.Img
        variant="top"
        style={{ height: "278px" }}
        src={
          poster_path !== null
            ? `https://image.tmdb.org/t/p/w185/${props.season.poster_path}`
            : defaultImg
        }
      />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>
          {season_number === 0 ? "Specials" : `Season ${season_number}`}
        </Card.Title>
        <Card.Subtitle>{episode_count} Episodes</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default SeasonCard;
