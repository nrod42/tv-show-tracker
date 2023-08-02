import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import styles from './NavBrand.module.css';
import logo from "../../img/popcorn.png";


const NavBrand = () => {
    return (
        <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
            <img src={logo} alt="logo" className={styles.logo} />
            Track TV
        </Navbar.Brand>
    );
};

export default NavBrand;