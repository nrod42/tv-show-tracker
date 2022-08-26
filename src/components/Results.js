import TvCard from "./TvCard";

const Results = (props) => {
  const { results } = props;

  return (
    <div className={"searchResults"}>
      <h1>Results:</h1>
      <div className="cardGrid">{results.map((show) => <TvCard key={show.id} showData={show} />)}</div>
    </div>
  );
};
export default Results;
