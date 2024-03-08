import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiConfig";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { BsEnvelope, BsPerson, BsLock } from "react-icons/bs";
import styles from './RegisterPageForm.module.css'

const RegisterPageForm = ({ setLoading }) => {
    // State variables to store user input
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
        // Registration form
        <Form
            className={'d-flex flex-column justify-content-center mt-4 mb-3'}
            onSubmit={register}
            style={{width: '275px'}}
        >
            {/* Email input */}
            <InputGroup>
                <InputGroup.Text className={styles.registerInput}>
                    <BsEnvelope />
                </InputGroup.Text>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    className={styles.registerInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </InputGroup>
            
            {/* Username input */}
            <InputGroup>
                <InputGroup.Text className={styles.registerInput}>
                    <BsPerson />
                </InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    value={username}
                    className={styles.registerInput}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </InputGroup>
            
            {/* Password input */}
            <InputGroup>
                <InputGroup.Text className={styles.registerInput}>
                    <BsLock />
                </InputGroup.Text>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    className={styles.registerInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </InputGroup>
            
            {/* Confirm Password input */}
            <InputGroup>
                <InputGroup.Text className={styles.registerInput}>
                    <BsLock style={{color: 'black'}}/>
                </InputGroup.Text>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    className={styles.registerInput}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </InputGroup>

            {/* Register button */}
            <Button variant="success" type="submit" className="mt-4 mb-5">
                Sign Up
            </Button>

        </Form>
    )
}

export default RegisterPageForm;
