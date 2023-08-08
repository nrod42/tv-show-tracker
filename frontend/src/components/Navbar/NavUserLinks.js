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
          setUserInfo(null); // Clear user info if token is not present
          return;
        }

        const response = await fetch(`${API_URL}/profile`, {
          credentials: "include",
        });
        if (response.ok) {
          const userInfo = await response.json(); // Set user info if response is successful
          setUserInfo(userInfo);
        } else {
          setUserInfo(null); // Clear user info if response is not successful
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [setUserInfo]);

  // Handle user logout
  const logout = () => {
    Cookies.remove("token"); // Remove token from cookies
    navigate("/"); // Navigate to home page
    setUserInfo(null); // Clear user info
    handleNavLinkClick(); // Handle navigation link click
  };

  return (
    <Nav className="text-center">
      {!userInfo ? (
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
        onClick={handleDarkMode} // Handle dark mode toggle
      />
    </Nav>
  );
};

export default NavUserLinks;
