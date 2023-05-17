import React, { useEffect, useState } from "react";
import MediaNav from "../components/MediaNav";
import Button from "react-bootstrap/Button";
import uniqid from "uniqid";
import MediaCard from "../components/Cards/MediaCard";

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
      <MediaNav type={type} />
      <h1>{title}</h1>
      <div className="cardGrid">
        {media.map((media) => (
          <MediaCard key={uniqid()} mediaData={media} />
        ))}
      </div>
      <Button className="showMoreBtn" onClick={showMore}>
        Show more
      </Button>
    </div>
  );
};

export default CategoryPage;
