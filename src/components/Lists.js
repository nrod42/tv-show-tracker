import { Link } from "react-router-dom";

const Lists = () => {
  return (
    <div>
      <Link to="/lists/currently-watching" className="myListBtn">
        Currently Watching
      </Link>
      <Link to="/lists/want-to-watch" className="myListBtn">
        Want To Watch
      </Link>
      <Link to="/lists/completed" className="myListBtn">
        Completed
      </Link>
      <Link to="/lists/dropped" className="myListBtn">
        Dropped
      </Link>
    </div>
  );
};

export default Lists;
