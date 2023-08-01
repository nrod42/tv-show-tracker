import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { UserContext } from "../Contexts/UserContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        navigate("/tv-show-tracker");
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={darkMode ? styles.loginPageDark : styles.loginPageLight}>
      <Container className={styles.container}>
        <h2 className="text-center">Login To Your Account</h2>
        <Form
          className="d-flex flex-column justify-content-center"
          onSubmit={handleSubmit}
        >
          <Row>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Button variant="success" type="submit">
            Login
          </Button>
        </Form>
        <div className="text-center">
          <Link to="/tv-show-tracker/register">
            <Button variant="link">Don't have an account? Register</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
