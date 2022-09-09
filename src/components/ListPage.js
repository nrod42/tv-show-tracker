import React, { useState, useEffect, useContext } from "react";
import { SetListsContext } from "../App";
import TvCard from "./Cards/TvCard";
import uniqid from "uniqid";

const ListPage = (props) => {
  const { list } = props;
  const { setShowPage } = useContext(SetListsContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(
      list.map((show) => (
        <TvCard key={uniqid()} showData={show} setShowPage={setShowPage} />
      ))
    );
  }, [list, setShowPage]);

  return (
    <div className={"listPage"}>
      <h1>{props.title}</h1>
      <div className="cardGrid">{cards}</div>
    </div>
  );
};
export default ListPage;
