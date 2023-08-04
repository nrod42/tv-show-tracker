import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import lightModeIcon from "../../img/light_mode_icon.svg";
import darkModeIcon from "../../img/dark_mode_icon.svg";
import styles from "./NavUserLinks.module.css";
import { UserContext } from "../../contexts/UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiConfig";

const NavUserLinks = ({ darkMode, handleDarkMode, handleNavLinkClick }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    // Verify User Profile
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setUserInfo(null);
          return;
        }

        const response = await fetch(`${API_URL}/profile`, {
          credentials: "include",
        });
        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [setUserInfo]);

  const logout = () => {
    Cookies.remove("token");
    navigate("/");
    setUserInfo(null);
    handleNavLinkClick();
  };

  return (
    <Nav className="text-center">
      {!userInfo ? (
        <>
          <Nav.Link as={Link} to="/register" onClick={handleNavLinkClick}>
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick}>
            Login
          </Nav.Link>
        </>
      ) : (
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      )}
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
