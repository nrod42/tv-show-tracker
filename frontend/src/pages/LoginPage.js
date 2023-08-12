import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { RandomBackdropContext } from "../contexts/RandomBackdropContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import styles from "./LoginPage.module.css";
import { ColorRing } from "react-loader-spinner";
import defaultMediaIcon from "../img/default_media_icon.svg";
import LoginPageForm from "../components/LoginPage/LoginPageForm";

const LoginPage = () => {
  // Context and State variables
  const { darkMode } = useContext(DarkModeContext);
  const { randomBackdrop } = useContext(RandomBackdropContext);
  const [loading, setLoading] = useState(false);
  

  return (
    // Main container for the Login Page
    <div
      className={darkMode ? styles.loginPageDark : styles.loginPageLight}
      style={{
        backgroundImage: `url(${
          randomBackdrop.backdrop !== null
            ? randomBackdrop.backdrop
            : defaultMediaIcon
        })`,
        backgroundSize: "cover",
      }}
    >
      {/* Background overlay */}
      <div className={styles.overlay}></div>
      <Container className={styles.container}>
        {/* Login form and information */}
        <div
          className={
            darkMode ? styles.loginPageInfoDark : styles.loginPageInfoLight
          }
        >
          {/* Login header */}
          <h2 className="text-center">Login To Your Account</h2>

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
                colors={["#198754", "#198754", "#198754", "#198754", "#198754"]}
              />
            </div>
          ) : (
            <LoginPageForm setLoading={setLoading}/>
          )}


          <div className="text-center">
            <Link to="/register">
              <Button variant="link">Don't have an account? Register</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
