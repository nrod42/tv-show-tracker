import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../apiConfig";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { RandomBackdropContext } from "../contexts/RandomBackdropContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./RegisterPage.module.css";
import { ColorRing } from "react-loader-spinner";
import defaultMediaIcon from "../img/default_media_icon.svg";

const RegisterPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { randomBackdrop } = useContext(RandomBackdropContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do no match. Please make sure they match");
      return;
    }

    // sends valid registration to backend
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
          firstName,
          lastName,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        alert("registration successful");
        navigate("/login");
      } else {
        alert("registration failed");
      }
    } catch (error) {
      console.error("Error registering", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={darkMode ? styles.registerPageDark : styles.registerPageLight}
      // style={{ backgroundImage: `url(${randomBackdrop.backdrop})` }}
    >
      <div className={styles.randomBackdropWrapper}>
        <img
          className={styles.randomBackdrop}
          src={
            randomBackdrop.backdrop !== null
              ? randomBackdrop.backdrop
              : defaultMediaIcon
          }
          alt={`${randomBackdrop.title} poster`}
        />
        <div className={styles.registerPageInfo}>
          <h2 className="text-center">Create Your Account</h2>
          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#198754"]}
            />
          ) : (
            <Form
              className="d-flex flex-column justify-content-center"
              onSubmit={register}
            >
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="E-Mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
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
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="success" type="submit">
                Register
              </Button>
            </Form>
          )}

          <div className="text-center">
            <Link to="/login">
              <Button variant="link">Already have an account? Login</Button>
            </Link>
          </div>
        </div>
      </div>

      <Container className={`mt-5 mb-5 ${styles.container}`}>
        {/* <div className={styles.registerBody}> */}

        {/* </div> */}
      </Container>
    </div>
  );
};

export default RegisterPage;
