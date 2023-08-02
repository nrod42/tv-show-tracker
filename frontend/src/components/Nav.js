import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { UserContext } from "../Contexts/UserContext";
import { getResults } from "./API/getMedia";
import Cookies from "js-cookie";
import NavBrand from "./Navbar/NavBrand";
import NavCatLinks from "./Navbar/NavCatLinks";
import NavSearchbar from "./Navbar/NavSearchbar";
import NavUserLinks from "./Navbar/NavUserLinks";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Nav.module.css";

const Navi = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput === "") return;
    const formattedQuery = searchInput.replace(" ", "-"); // Replace spaces with dashes
    navigate(`/results/${encodeURIComponent(formattedQuery)}`);
  };

  const handleInputChange = async (e) => {
    setSearchInput(e.target.value)
    const formattedQuery = searchInput.replace(" ", "-"); // Replace spaces with dashes

    // Fetch search suggestions from your API
    try {
      const results = await getResults(formattedQuery);
      setSuggestions(results.slice(0,3));
    } catch (error) {
      console.error(error);
    }
  }

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
          <div className="d-flex align-items-center justify-content-between w-100">
            <NavCatLinks userInfo={userInfo}/>
            <NavSearchbar searchInput={searchInput} handleInputChange={handleInputChange} handleSearch={handleSearch} suggestions={suggestions}/>
            <NavUserLinks userInfo={userInfo} logout={logout} darkMode={darkMode} handleDarkMode={handleDarkMode}/>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
