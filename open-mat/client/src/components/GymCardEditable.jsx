import React, { useState, useEffect} from "react";
import {api} from '../api/api';
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditGymModal from "./EditGymModal";
import { useAuth } from "../context/AuthContext";
export default function GymCard({ gymData, isOwner,onDelete,onUpdate}) {
  const { id, name, street, city, state, zip, distance } = gymData;
  const [showEdit, setShowEdit] = useState(false);
   const [isFavorited, setIsFavorited] = useState(false);
const { isAuthenticated ,user} = useAuth();
const token = localStorage.getItem('token');
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
      <Card style={{ width: "60rem" }}>
        <Card.Body className="d-flex align-items-center">
          <div style={{ width: "130px" }} />

          <div className="text-center flex-grow-1">
            <Link to={`/gyms/${id}`}>
              <h2>{name}</h2>
              <h5>{street}, {city}, {state} {zip}</h5>
                
            </Link>
          </div>

          <div className="d-flex flex-column align-items-end gap-2">
             
                                    <Button 
                                        size="sm"
                                        variant={isFavorited ? "outline-danger" : "outline-primary"}
                                        onClick={toggleFavorite}
                                        style={{ width: '130px' }}
                                    >
                                        {isFavorited ? "Remove Favorite" : "Add Favorite"}
                                    </Button>

            {isOwner &&(
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => setShowEdit(true)}
              >
                Edit Gym
              </Button>
            )}
          </div>
           
        </Card.Body>
      </Card>

      {isOwner && (
        <EditGymModal
  show={showEdit}
  onHide={() => setShowEdit(false)}
  gym={gymData}
  onDelete={onDelete}
  onUpdate={onUpdate}
/>

      )}
    </div>
  );
}
