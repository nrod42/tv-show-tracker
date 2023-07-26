import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeContext";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../img/popcorn.png";
import lightModeIcon from "../img/light_mode_icon.svg";
import darkModeIcon from "../img/dark_mode_icon.svg";
import styles from "./Nav.module.css";
import { API_URL } from "../apiConfig";

const Navi = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

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

  const logout = () => {
    Cookies.remove("token");
    navigate("/tv-show-tracker");
    setUserInfo(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput === "") return;
    const formattedQuery = searchInput.replace(" ", "-"); // Replace spaces with dashes
    navigate(`/tv-show-tracker/results/${encodeURIComponent(formattedQuery)}`);
  };

  const handleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
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
        <Navbar.Brand
          as={Link}
          to="/tv-show-tracker"
          className={styles.navbarBrand}
        >
          <img src={logo} alt="logo" className={styles.logo} />
          Track TV
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-start">
          <Nav className={`text-center ${styles.navLinks}`}>
            <Nav.Link as={Link} to="/tv-show-tracker/movies/top-rated">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/tv-show-tracker/tv/top-rated">
              TV
            </Nav.Link>
            {userInfo && (
              <Nav.Link as={Link} to="/tv-show-tracker/lists">
                Lists
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-center">
          <Form onSubmit={handleSearch} className={styles.searchForm}>
            <Form.Control
              onChange={(e) => setSearchInput(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchInput}
            />
            <Button variant="success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className={`text-center ${styles.navLinks}`}>
            {!userInfo ? (
              <>
                <Nav.Link as={Link} to="/tv-show-tracker/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/tv-show-tracker/login">
                  Login
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            )}
            <img
              src={darkMode ? lightModeIcon : darkModeIcon}
              className={styles.darkModeToggle}
              alt="dark mode"
              style={{ width: "30px", height: "auto" }}
              onClick={handleDarkMode}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
