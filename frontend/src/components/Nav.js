import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { UserContext } from "../Contexts/UserContext";
import Cookies from "js-cookie";
import NavBrand from "./Navbar/NavBrand";
import NavCatLinks from "./Navbar/NavCatLinks";
import NavSearchbar from "./Navbar/NavSearchbar";
import NavUserLinks from "./Navbar/NavUserLinks";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./Nav.module.css";

const Navi = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Verify User Profile
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setUserInfo(null);
          return; // Skip fetching the user profile if no token exists
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

  const handleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/");
    setUserInfo(null);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={`mb-3 ${styles.navbar}`}
      fixed="top"
    >
      <Container fluid>
        <NavBrand />
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Row className=" align-items-center w-100">
            {/* Display order changes on small screens (mobile) */}
            <Col sm={12} md={6} lg={4} className="mb-3 mb-md-0">
              <NavCatLinks userInfo={userInfo} />
            </Col>
            <Col sm={12} md={6} lg={4} className="mb-3 mb-md-0">
              <NavSearchbar />
            </Col>
            <Col sm={12} md={12} lg={4} className="d-flex justify-content-end">
              <NavUserLinks
                userInfo={userInfo}
                logout={logout}
                darkMode={darkMode}
                handleDarkMode={handleDarkMode}
              />
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
