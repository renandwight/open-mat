import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { api } from "../api/api";
import { useAuth } from '../context/AuthContext';

export default function EditGymModal({ show, onHide, gym,onDelete,onUpdate}) {
  const { isAuthenticated ,user} = useAuth();
      const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({ ...gym });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
  onDelete(gym.id)
  onHide()
}

  const handleSave = () => {
  onUpdate(gym.id, formData)
  onHide()
}

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Gym</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mb-2"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Form.Control
            className="mb-2"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          <Form.Control
            className="mb-2"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <Form.Control
            className="mb-2"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <Form.Control
            className="mb-2"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-between">
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete Gym
        </Button>

        <div>
          <Button variant="secondary" onClick={onHide} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
