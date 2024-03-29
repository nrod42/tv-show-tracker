import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Nav from "react-bootstrap/Nav";
import lightModeIcon from "../../img/light_mode_icon.svg";
import darkModeIcon from "../../img/dark_mode_icon.svg";
import styles from "./NavUserLinks.module.css";
import Cookies from "js-cookie";

const NavUserLinks = ({ darkMode, handleDarkMode, handleNavLinkClick }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  // Handle user logout
  const logout = () => {   
    Cookies.remove("token");
    setUserInfo(null);
    navigate("/");
    handleNavLinkClick(); 
  };

  return (
    <Nav className="text-center">
      {!userInfo?.id ? (
        // Display registration and login links if user is not logged in
        <>
          <Nav.Link as={Link} to="/register" onClick={handleNavLinkClick}>
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick}>
            Login
          </Nav.Link>
        </>
      ) : (
        // Display logout link if user is logged in
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      )}
      {/* Display dark mode toggle icon */}
      <img
        src={darkMode ? lightModeIcon : darkModeIcon}
        alt="dark mode"
        className={`${styles.darkModeToggle} ms-3`}
        style={{ width: "30px", height: "auto" }}
        onClick={handleDarkMode}
      />
    </Nav>
  );
};

export default NavUserLinks;
