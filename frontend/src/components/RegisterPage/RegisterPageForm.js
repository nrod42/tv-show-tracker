import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiConfig";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const RegisterPageForm = ({ setLoading }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    // Function to handle user registration
    const register = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
        alert("Passwords do not match. Please make sure they match.");
        return;
        }

        try {
        setLoading(true);
        // Send registration data to the backend
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

        // Handle registration success or failure
        if (response.ok) {
            alert("Registration successful");
            navigate("/login");
        } else {
            alert("Registration failed");
        }
        } catch (error) {
        console.error("Error registering", error);
        } finally {
        setLoading(false);
        }
    }

    return (
        <Form
            className="d-flex flex-column justify-content-center mt-5 mb-5"
            onSubmit={register}
        >
            <Row>
            {/* First Name and Last Name fields */}
            <Row className="mb-3">
                <Col md={6}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group controlId="formLastName">
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
            {/* Email and Username fields */}
            <Row className="mb-3">
                <Col md={6}>
                <Form.Group controlId="formEmail">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                </Col>
            </Row>
            {/* Password and Confirm Password fields */}
            <Row className="mb-3">
                <Col md={6}>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                </Col>
            </Row>
            </Row>
            {/* Register button */}
            <div className="text-center mt-3">
            <Button variant="success" type="submit">
                Register
            </Button>
            </div>
        </Form>
    )
}

export default RegisterPageForm;