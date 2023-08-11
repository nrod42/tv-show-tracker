import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { UserContext } from "../contexts/UserContext";
import { RandomBackdropContext } from "../contexts/RandomBackdropContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import styles from "./LoginPage.module.css";
import { ColorRing } from "react-loader-spinner";
import defaultMediaIcon from "../img/default_media_icon.svg";

const LoginPage = () => {
  // Context and State variables
  const { darkMode } = useContext(DarkModeContext);
  const { randomBackdrop } = useContext(RandomBackdropContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldAutoSubmit, setShouldAutoSubmit] = useState(false);

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  // Submit handler for form
  const handleSubmit = async (e = null) => {
    if (e) {
      e.preventDefault();
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        navigate("/");
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.error("Error logging in", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Guest Login button click
  const handleGuestLogin = () => {
    setUsername("Guest");
    setPassword("Guest");
    setShouldAutoSubmit(true);
  };

  // Automatically submit the form when auto-submit condition is met
  useEffect(() => {
    if (shouldAutoSubmit && username === "Guest" && password === "Guest") {
      handleSubmit();
    }
  }, [shouldAutoSubmit, username, password]);

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
            // Login form when not loading
            <Form
              className="d-flex flex-column justify-content-center mt-5 mb-5"
              onSubmit={handleSubmit}
            >
              {/* Username and Password fields */}
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Submit button */}
              <Button variant="success" type="submit">
                Login
              </Button>
            </Form>
          )}

          {/* Guest login and registration links */}
          <div className="text-center mt-5 mb-5">
            <Button variant="success" onClick={handleGuestLogin}>
              Login with Guest Account
            </Button>
          </div>
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
