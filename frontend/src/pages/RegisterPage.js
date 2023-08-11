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
          <h2 className="text-center">Create Your Account</h2>
          {/* Display loading spinner or registration form */}
          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#198754", "#198754", "#198754", "#198754", "#198754"]} // Color for the loading spinner
            />
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
