
const ShowPage = (props) => {
  const { title, rating, poster, plot, actors, year } = props.showInfo;
  console.log(props.showInfo)

  return (
    <div className="showPage">
      <div className="topHalf">{/* <img></img> */}</div>
      <div className="showPagePoster"><img src = {poster} alt={`${title} poster`}/></div>
      <h2>{title}</h2>
      <p>({year})</p>
      <p>IMDB Rating: {rating}</p>
      <p>Staring: {actors}</p>
      <p>{plot}</p>
    </div>
  );
};

export default ShowPage;
