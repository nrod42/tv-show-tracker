import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserContext } from "../../Contexts/UserContext";

const NavCatLinks = ({handleNavLinkClick}) => {
  const {userInfo} = useContext(UserContext);
  return (
    <Nav className={"text-center"}>
      <Nav.Link as={Link} to="/movie/category/top-rated" onClick={handleNavLinkClick}>
        Movies
      </Nav.Link>
      <Nav.Link as={Link} to="/tv/category/top-rated" onClick={handleNavLinkClick}>
        TV
      </Nav.Link>
      {userInfo && (
        <Nav.Link as={Link} to="/lists" onClick={handleNavLinkClick}>
          Lists
        </Nav.Link>
      )}
    </Nav>
  );
};

export default NavCatLinks;
