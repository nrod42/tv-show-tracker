import { Link } from "react-router-dom";

const Lists = (props) => {
  const {
  watchingList,
  wantToWatchList,
  completedList,
  droppedList,
  } = props

  return (
    <div>
      <h1>Lists</h1>
      <div>
        <Link to="/lists/currently-watching" className="myListBtn">
          Currently Watching
        </Link>
        <div className="listDetails">
          <p>Movies: </p>
          <p>Series: {watchingList.length}</p>
        </div>
      </div>
      <div>
        <Link to="/lists/want-to-watch" className="myListBtn">
          Want To Watch
        </Link>
        <div className="listDetails">
          <p>Movies:</p>
          <p>Series: {wantToWatchList.length}</p>
        </div>
      </div>
      <div>
        <Link to="/lists/completed" className="myListBtn">
          Completed
        </Link>
        <div className="listDetails">
          <p>Movies:</p>
          <p>Series: {completedList.length}</p>
        </div>
      </div>
      <div>
        <Link to="/lists/dropped" className="myListBtn">
          Dropped
        </Link>
        <div className="listDetails">
          <p>Movies:</p>
          <p>Series: {droppedList.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Lists;
