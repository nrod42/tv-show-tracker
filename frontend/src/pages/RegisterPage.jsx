import React, { useState, useContext } from "react";
import {  Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { RandomBackdropContext } from "../contexts/RandomBackdropContext";
import RegisterPageForm from "../components/RegisterPage/RegisterPageForm";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import styles from "./RegisterPage.module.css";
import { ColorRing } from "react-loader-spinner";
import defaultMediaIcon from "../img/default_media_icon.svg";
import logo from '../img/popcorn.png';

const RegisterPage = () => {
  // Context and state variables
  const { darkMode } = useContext(DarkModeContext);
  const { randomBackdrop } = useContext(RandomBackdropContext);

  const [loading, setLoading] = useState(false);

  return (
    // Main container for the Register Page
    <div
      className={darkMode ? styles.registerPageDark : styles.registerPageLight}
      style={{
        backgroundImage: `url(${
          randomBackdrop.backdrop !== null
            ? randomBackdrop.backdrop
            : defaultMediaIcon
        })`,
        backgroundSize: "cover",
      }}
    >
      {/* Background image and overlay */}
      <div className={styles.backgroundImage}>
        <div className={styles.overlay}></div>
      </div>
      <Container className={styles.container}>
        <div
          className={
            darkMode
              ? styles.registerPageInfoDark
              : styles.registerPageInfoLight
          }
        >
          {/* Register header */}
          <h1 className={`mb-5 ${styles.brand}`}>
            <div className={styles.logoWrapper}>
              <img src={logo} alt="logo" className={styles.logoImg} />
            </div>
            Trackr
          </h1>
          <h2 className="text-center">Register</h2>

          {/* Conditionally show loading spinner or login form */}
          {loading ? (
            // Loading spinner when the login request is in progress
            <div className="text-center mt-5 mb-5">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#198754", "#198754", "#198754", "#198754", "#198754"]} // Color for the loading spinner
              />
            </div>
          ) : (
            <RegisterPageForm setLoading={setLoading}/>
          )}
          {/* Already have an account link */}
          <div className="text-center">
            <Link to="/login">
              <Button variant="link">Already have an account? Login</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
