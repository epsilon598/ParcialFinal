import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Card from "react-bootstrap/Card";
import "./signin.scss";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const onEmailChange = (e) => {
        setEmail(e);
        setValidated(false);
    };

    const onPasswordChange = (e) => {
        setPassword(e);
        setValidated(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        const URL = "http://localhost:8080/api/v1/verifyUser";
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                email: email,
                password: password,
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Invalid credentials');
                }
            })
            .then((user) => {
                const perfil = user.id;
                localStorage.setItem("user", perfil);
                localStorage.setItem("user-complete", JSON.stringify(user));

                navigate(`/tournaments`);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(true);
            });
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <Card.Body>
                    <h3>Login</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="loginForm">
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    required
                                    onChange={(e) => onEmailChange(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="validationCustomPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => onPasswordChange(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a password
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <br></br>
                        <div className="d-flex justify-content-center">
                            <Button type="submit">Login</Button>
                        </div>
                        <br></br>
                        {error && <div className="error-message">Username or password are incorrect!</div>}
                        <div>
                            Not registered yet? <Link to="/register">Register</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
} export default Login;
