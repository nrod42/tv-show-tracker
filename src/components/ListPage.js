import React, { useEffect, useState, useContext } from "react";
import { SetListsContext } from "../App";
import TvCard from "./TvCard";

const ListPage = (props) => {
  const { list } = props;
  const { setShowPage } = useContext(SetListsContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(
      list.map((show) => (
        <TvCard key={show.id} showData={show} setShowPage={setShowPage} />
      ))
    );
  }, [list, setShowPage]);

  return (
    <div className={"myList"}>
      <h1>{props.title}</h1>
      <div className="cardGrid">{cards}</div>
    </div>
  );
};
export default ListPage;
