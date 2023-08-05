import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { UserContext } from "../contexts/UserContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import styles from "./LoginPage.module.css";
import { ColorRing } from "react-loader-spinner";

const LoginPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const setGuestCredentials = async () => {
    setUsername("Guest");
    setPassword("Guest");
  };

  const handleGuestLogin = async (e) => {
    await setGuestCredentials();
    await handleSubmit(e);
  };

  return (
    <div className={darkMode ? styles.loginPageDark : styles.loginPageLight}>
      <Container className={styles.container}>
        <h2 className="text-center">Login To Your Account</h2>

        {loading ? (
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
        )}
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
      </Container>{" "}
      -->
    </div>
  );
};

export default LoginPage;
