import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import "./create.scss";

function Create() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const onEmailChange = (e) => {
        setEmail(e);
    };

    const onPasswordChange = (e) => {
        setPassword(e);
    };

    const onNameChange = (e) => {
        setName(e);
    };


    function createCliente() {
        let _email = email;
        let _password = password;
        let _name = name;

        fetch('http://localhost:8080/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: _email, name: _name, password: _password }),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to create user');
            }
        }).then(data => {
            localStorage.setItem("user", data.id);
            localStorage.setItem("user-complete", JSON.stringify(data));
            navigate(`/users/${data.id}/tournaments`);
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        createCliente();
    };

    return (
        <div className="register-container">
            <Card className="register-card">
                <Card.Body>
                    <h3>Register</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Please enter your name"
                                    minLength={6}
                                    onChange={(e) => onNameChange(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a Name
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Please enter your email"
                                    minLength={6}
                                    onChange={(e) => onEmailChange(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Please enter your password"
                                minLength={8}
                                onChange={(e) => onPasswordChange(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a password. Minimum 8 characters!
                            </Form.Control.Feedback>
                            <InputGroup hasValidation></InputGroup>
                        </Form.Group>
                        <br />
                        <div className="d-flex justify-content-center">
                            <Button type="submit">Register</Button>
                        </div>
                    </Form>
                    <br />
                    <div className="text-center">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Create;
