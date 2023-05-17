import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import SeriesNav from "../components/SeriesNav";
import TvCard from "../components/Cards/TvCard";
import MovieCard from "../components/Cards/MovieCard";
import uniqid from "uniqid";
import MoviesNav from "../components/MoviesNav";

const CategoryPage = ({type, title, getMedia}) => {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);

  const showMore = async () => {
    const newPage = await getMedia(type, page);
    setMedia([...media, ...newPage]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    showMore();
  }, []);

  return (
    <div className={"categoryPage"}>
      {type === 'tv' ? 
      <SeriesNav /> : <MoviesNav /> }
      <h1>{title}</h1>
      <div className="cardGrid">
        {media.map((media) => (
          type==='tv' ?
          <TvCard key={uniqid()} showData={media} /> 
          : <MovieCard key={uniqid()} movieData={media} />
        ))}
      </div>
      <Button className="showMoreBtn" onClick={showMore}>
        Show more
      </Button>
    </div>
  );
};
export default CategoryPage;
