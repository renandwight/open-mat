import React, { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import { api } from '../api/api';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function GymCard({ gymData }) {
    const { id, name, street, city, state, zip, distance } = gymData;
    const [isFavorited, setIsFavorited] = useState(false);
    const { isAuthenticated ,user} = useAuth();
    const token = localStorage.getItem('token');
    const link = "" + id;

    useEffect(() => {
        if (!isAuthenticated) return;
        const checkFavorite = async () => {
            try {
                const response = await api.get('users/favorites/', {
                    headers: { Authorization: `Token ${token}` }
                });
                setIsFavorited(response.data.some(fav => fav.gym_details.id === id));
            } catch (error) {
                console.log(error);
            }
        };
        checkFavorite();
    }, [id, isAuthenticated, token]);

    const toggleFavorite = async () => {
        try {
            if (isFavorited) {
                await api.delete(`users/favorites/${id}/`, {
                    headers: { Authorization: `Token ${token}` }
                });
                setIsFavorited(false);
            } else {
                await api.post('users/favorites/', { gym: id }, {
                    headers: { Authorization: `Token ${token}` }
                });
                setIsFavorited(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex justify-content-center mb-3">
            <Card style={{ width: '60rem' }}>
                <Card.Body className="d-flex align-items-center">
                    <div style={{ width: '130px' }}></div>
                    
                    <div className="text-center flex-grow-1">
                        <Link to={link}>
                            <h2>{name}</h2>
                            <h3>{street} {city}, {state} {zip}</h3>
                            <p>{distance ? "distance: " + distance : null}</p>
                            
                        </Link>
                    </div>
                    
                    {isAuthenticated ? (
                        <Button 
                            size="sm"
                            variant={isFavorited ? "outline-danger" : "outline-primary"}
                            onClick={toggleFavorite}
                            style={{ width: '130px' }}
                        >
                            {isFavorited ? "Remove Favorite" : "Add Favorite"}
                        </Button>
                    ) : (
                        <div style={{ width: '130px' }}></div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}