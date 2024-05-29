import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./tournament-card.scss";

function TournamentCard({ id, name, deadline, image, maxParticipants, currentParticipants, isRegistered }) {
    const [registered, setRegistered] = useState(isRegistered);
    const userId = localStorage.getItem('user');

    const handleRegister = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/users/${userId}/tournaments/${id}`, {
                method: 'POST'
            });

            if (response.ok) {
                setRegistered(true);
            } else {
                console.error("Error registering for the tournament");
            }
        } catch (error) {
            console.error("Error registering for the tournament", error);
        }
    };

    const handleUnregister = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/users/${userId}/tournaments/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setRegistered(false);
            } else {
                console.error("Error unregistering from the tournament");
            }
        } catch (error) {
            console.error("Error unregistering from the tournament", error);
        }
    };

    return (
        <Card className="tournament-card">
            <Row noGutters>
                <Col md={4} className="image-container">
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${image}`} alt={name} className="tournament-image" />
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>Fecha límite: {deadline}</Card.Text>
                        <Card.Text>Cupos disponibles: {maxParticipants - currentParticipants}</Card.Text>
                        <div className="button-group">
                            {!registered && (
                                <Button variant="primary" className="mr-2" onClick={() => handleRegister()}>Registrar</Button>
                            )}
                            {registered && (
                                <Button variant="danger" onClick={() => handleUnregister()}>Cancelar registro</Button>
                            )}
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
} export default TournamentCard;