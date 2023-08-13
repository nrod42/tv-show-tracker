import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiConfig";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import styles from './RegisterPageForm.module.css';

const RegisterPageForm = ({ setLoading }) => {
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
            className={`d-flex flex-column justify-content-center mt-5 mb-3`}
            onSubmit={register}
            style={{maxWidth: '300px'}}
        >
            <div className="mb-3">
                <Form.Group controlId="formEmail">
                    <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Control
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
            </div>

            {/* Register button */}
            <Button variant="success" type="submit" className="mt-3">
                Register
            </Button>

        </Form>
    )
}

export default RegisterPageForm;