import React from "react";

const Home = (props) => {
  const { homeCards, setHomePage } = props;

  const handleNextPage = () => {
    setHomePage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setHomePage((prev) => (prev === 1 ? prev : prev - 1));
  };
  return (
    <div className={"home"}>
      <h1>Popular</h1>
      <div className="cardGrid">{homeCards}</div>
      <div className="pageNavBtns">
        <button onClick={handlePrevPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};
export default Home;
