import React from 'react';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import lightModeIcon from "../../img/light_mode_icon.svg";
import darkModeIcon from "../../img/dark_mode_icon.svg";
import styles from './NavUserLinks.module.css'

const NavUserLinks = ({ userInfo, logout, darkMode, handleDarkMode }) => {
    return (
        <Nav className={`text-center ${styles.navLinks}`}>
            {!userInfo ? (
                <>
                <Nav.Link as={Link} to="/register">
                    Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                    Login
                </Nav.Link>
                </>
            ) : (
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            )}
            <img
                src={darkMode ? lightModeIcon : darkModeIcon}
                className={`${styles.darkModeToggle} ms-3 me-3`}
                alt="dark mode"
                style={{ width: "30px", height: "auto" }}
                onClick={handleDarkMode}
            />
        </Nav>
    );
}

export default NavUserLinks