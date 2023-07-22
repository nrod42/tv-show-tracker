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
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../img/popcorn.png";
import lightModeIcon from "../img/light_mode_icon.svg"
import darkModeIcon from "../img/dark_mode_icon.svg";
import { API_URL } from "../apiConfig";

const Navi = ({ setSearchQuery }) => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext)
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

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/tv-show-tracker/results");
    setSearchQuery(searchInput);
  };

  const handleDarkMode = () => {
    setDarkMode((prevState) => !prevState)
  }

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          bg="dark"
          variant="dark"
          expand={expand}
          className="mb-3"
          fixed="top"
        >
          <Container fluid>
            <Navbar.Brand
              as={Link}
              to="/tv-show-tracker"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <img src={logo} alt={"logo"} style={{ height: "20px" }}></img>
              Track TV
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Offcanvas placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Track TV</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className="justify-content-end flex-grow-1 pe-3"
                  style={{ textAlign: "center" }}
                >
                  <Nav.Link as={Link} to={"/tv-show-tracker"}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/tv-show-tracker/movies/top-rated"}>
                    Movies
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/tv-show-tracker/tv/top-rated"}>
                    TV
                  </Nav.Link>
                  {userInfo ? (
                    <>
                      <Nav.Link as={Link} to={"/tv-show-tracker/lists"}>
                        Lists
                      </Nav.Link>
                      <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to={"/tv-show-tracker/register"}>
                        Register
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/tv-show-tracker/login"}>
                        Login
                      </Nav.Link>
                    </>
                  )}
                </Nav>
                <Form onSubmit={handleSearch} className="d-flex searchForm">
                  <Form.Control
                    onChange={handleSearchInput}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchInput}
                  />
                  <Button
                    variant="success"
                    type="submit"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Form>
                {/* <Button onClick={handleDarkMode}>Dark</Button> */}
                {/* <Button  variant="dark"> */}
                  <img
                    src={darkMode ? lightModeIcon : darkModeIcon }
                    alt="dark mode"
                    style={{ width: "30px", height: "auto" }}
                    onClick={handleDarkMode}
                  />
                {/* </Button> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Navi;
