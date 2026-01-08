import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditGymModal from "./EditGymModal";
import { useAuth } from "../context/AuthContext";
export default function GymCard({ gymData, isOwner,onDelete,onUpdate}) {
  const { id, name, street, city, state, zip, distance } = gymData;
  const [showEdit, setShowEdit] = useState(false);
const { isAuthenticated ,user} = useAuth();
const token = localStorage.getItem('token');

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
            <Button size="sm" variant="outline-primary">
              ☆ Add Favorite
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
