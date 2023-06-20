import MediaCard from "../components/Cards/MediaCard";
import uniqid from "uniqid";

const ListPage = ({list, title}) => {

  return (
    <div className={"listPage"}>
      <h1>{title}</h1>
      <div className="cardGrid">     
       {list.map((show) => (
        <MediaCard key={uniqid()} mediaData={show} />
      ))}
      </div>
    </div>
  );
};

export default ListPage;
