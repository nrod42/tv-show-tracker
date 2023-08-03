import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const NavCatLinks = ({ userInfo }) => {
  return (
    <Nav className={"text-center"}>
      <Nav.Link as={Link} to="/movie/category/top-rated">
        Movies
      </Nav.Link>
      <Nav.Link as={Link} to="/tv/category/top-rated">
        TV
      </Nav.Link>
      {userInfo && (
        <Nav.Link as={Link} to="/lists">
          Lists
        </Nav.Link>
      )}
    </Nav>
  );
};

export default NavCatLinks;
