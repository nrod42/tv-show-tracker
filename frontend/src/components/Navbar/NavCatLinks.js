import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserContext } from "../../contexts/UserContext";

const NavCatLinks = ({ handleNavLinkClick }) => {
  // Access user information from the UserContext
  const { userInfo } = useContext(UserContext);

  return (
    <Nav className={"text-center"}>
      {/* Link to the top-rated movie category */}
      <Nav.Link
        as={Link}
        to="/movie/category/top-rated"
        onClick={handleNavLinkClick}
      >
        Movies
      </Nav.Link>
      {/* Link to the top-rated TV category */}
      <Nav.Link
        as={Link}
        to="/tv/category/top-rated"
        onClick={handleNavLinkClick}
      >
        TV
      </Nav.Link>
      {/* Show the Lists link if user information is available */}
      {userInfo && (
        <Nav.Link as={Link} to="/lists" onClick={handleNavLinkClick}>
          Lists
        </Nav.Link>
      )}
    </Nav>
  );
};

export default NavCatLinks;
