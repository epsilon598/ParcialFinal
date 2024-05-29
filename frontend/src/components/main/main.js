import React, { useEffect, useState } from "react";
import TournamentList from "../tournament/tournament-list/tournament-list";
import "./main.scss";

function Main() {
    const [tournaments, setTournaments] = useState([]);
    const userId = localStorage.getItem('user');

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/tournaments');
                const data = await response.json();
                const tournamentsWithParticipants = await Promise.all(data.map(async tournament => {
                    try {
                        const participantsResponse = await fetch(`http://localhost:8080/api/v1/tournament/${tournament.id}/users`);
                        const participantsData = await participantsResponse.json();
                        const isRegistered = participantsData.some(participant => participant.id === userId);
                        return {
                            ...tournament,
                            currentParticipants: participantsData.length,
                            isRegistered: isRegistered
                        };
                    } catch (error) {
                        console.error(`Error fetching participants for tournament ${tournament.id}:`, error);
                        return {
                            ...tournament,
                            currentParticipants: 0,
                            isRegistered: false
                        };
                    }
                }));
                setTournaments(tournamentsWithParticipants);
            } catch (error) {
                console.error("There was an error fetching the tournaments!", error);
            }
        };

        fetchTournaments();
    }, [userId, tournaments]);

    return (
        <div>
            <TournamentList tournaments={tournaments}></TournamentList>
        </div>
    );
} export default Main;