import React, { useState, useContext } from "react";

import { DarkModeContext } from "../../contexts/DarkModeContext";
import NavBrand from "./NavBrand";
import NavCatLinks from "./NavCatLinks";
import NavSearchbar from "./NavSearchbar";
import NavUserLinks from "./NavUserLinks";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./Nav.module.css";

const Nav = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [collapseOpen, setCollapseOpen] = useState(false); // State for collapsible

  const handleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const handleCollapseToggle = () => {
    setCollapseOpen((prevOpen) => !prevOpen); // Toggle the collapsible state
  };

  const handleNavLinkClick = () => {
    setCollapseOpen(false); // Close the collapsible when a link is clicked
  };

  return (
    <Navbar
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      expand="lg"
      className={`mb-3 ${styles.navbar}`}
      fixed="top"
    >
      <Container fluid>
        <NavBrand />
        <Navbar.Toggle />
        {/* Toggle collapsible */}
        <Navbar.Collapse in={collapseOpen}>
          <Row className="align-items-center w-100">
            <Col sm={12} md={6} lg={4} className="mb-3 mb-md-0">
              <NavCatLinks handleNavLinkClick={handleNavLinkClick} />
            </Col>
            <Col sm={12} md={6} lg={4} className="mb-3 mb-md-0">
              <NavSearchbar />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={4}
              className={`d-flex ${styles.navContainer}`}
            >
              <NavUserLinks
                darkMode={darkMode}
                handleDarkMode={handleDarkMode}
                handleNavLinkClick={handleNavLinkClick}
              />
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
