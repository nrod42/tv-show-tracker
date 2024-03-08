import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiConfig";
import { UserContext } from "../../contexts/UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { BsPerson, BsLock } from "react-icons/bs";
import styles from './LoginPageForm.module.css'

const LoginPageForm = ({ setLoading }) => {
    // State variables to store user input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [shouldAutoSubmit, setShouldAutoSubmit] = useState(false);

    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext);

    // Login function
    const login = async (e = null) => {
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
            login();
        }
    }, [shouldAutoSubmit, username, password]);

    return (
        <>
            {/* Login form when not loading */}
            <Form
                className="d-flex flex-column justify-content-center mt-4 mb-5"
                onSubmit={login}
                style={{ width: '275px' }}
            >
                {/* Username and Password fields */}
                <InputGroup>
                    <InputGroup.Text className={styles.loginInput}>
                        <BsPerson />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        value={username}
                        className={styles.loginInput}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text className={styles.loginInput}>
                        <BsLock />
                    </InputGroup.Text>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className={styles.loginInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>

                {/* Login button */}
                <Button variant="success" type="submit" className="mt-3">
                    Login
                </Button>
            </Form>

            {/* Guest login and registration links */}
            <div className="text-center mt-3 mb-5">
                <Button variant="success" onClick={handleGuestLogin}>
                    Login as Guest
                </Button>
            </div>
        </>
    )
}

export default LoginPageForm;
