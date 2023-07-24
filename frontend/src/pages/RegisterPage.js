import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { API_URL } from "../apiConfig";
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
          firstName,
          lastName,
          //   profilePic: "uploads/default-user-pic.png",
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        alert("registration successful");
        navigate("/tv-show-tracker/login");
      } else {
        alert("registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={darkMode ? styles.registerPageDark : styles.registerPageLight}>
      <Container className={styles.container}>
        <Form
          className="d-flex flex-column justify-content-center"
          onSubmit={register}
        >
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterPage;
