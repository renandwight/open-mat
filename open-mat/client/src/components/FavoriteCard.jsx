import React from "react";
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function FavoriteCard({ favoriteData, onRemove }) {
    const { id, name, street, city, state, zip } = favoriteData.gym_details;

    return (
        <div className="d-flex justify-content-center mb-3">
            <Card style={{ width: '60rem' }}>
                <Card.Body className="d-flex align-items-center">
                    <div style={{ width: '130px' }}></div>
                    
                    <div className="text-center flex-grow-1">
                        <Link to={`/gyms/${id}`}>
                            <h2>{name}</h2>
                            <h3>{street} {city}, {state} {zip}</h3>
                        </Link>
                    </div>
                    
                    <Button 
                        size="sm"
                        variant="outline-danger"
                        onClick={() => onRemove(id)}
                        style={{ width: '130px' }}
                    >
                        Remove Favorite
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}