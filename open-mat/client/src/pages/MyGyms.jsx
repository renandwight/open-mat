import GymCard from '../components/GymCardEditable'
import {api} from '../api/api'
import {Card, Button, Form} from 'react-bootstrap'
import { useEffect, useState} from 'react';
import { useSearchParams} from "react-router-dom"
import { useAuth } from '../context/AuthContext';
export default function MyGyms(){
const [gyms, setGyms] = useState([]) 
const { isAuthenticated ,user} = useAuth();
const token = localStorage.getItem('token');
const [formData, setFormData] = useState({

    name: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  })

useEffect(() => {
    const getGyms = async () => {
    
    console.log('getGyms')
    try {
        const response=await api.get('gyms/my/',{headers: { Authorization: `Token ${token}` }})
        setGyms(response.data)
        
    }
    catch(error){
        console.log(error)
    }
}
    getGyms()
   
}, []);
 
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("gyms/", formData,{headers: { Authorization: `Token ${token}` }
                })
      if (response.status === 201) {
        setGyms(prev => [response.data, ...prev])
        setFormData({
          name: "",
          street: "",
          city: "",
          state: "",
          zip: ""
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleDeleteGym = async (id) => {
  try {
    await api.delete(`gyms/${id}/`, {
      headers: { Authorization: `Token ${token}` }
    })
    setGyms(prev => prev.filter(g => g.id !== id))
  } catch (err) {
    console.log(err)
  }
}

const handleUpdateGym = async (id, updatedData) => {
  try {
    const response = await api.put(
      `gyms/${id}/`,
      updatedData,
      { headers: { Authorization: `Token ${token}` } }
    )

    setGyms(prev =>
      prev.map(g => (g.id === id ? updatedData : g))
    )
  } catch (err) {
    console.log(err)
  }
}
   
    return(
        <div className="container mt-4">

      {/* CREATE GYM FORM */}
      <Card className="mb-4">
        <Card.Body>
          <h3 className="mb-3">Create a Gym</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Street</Form.Label>
              <Form.Control
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Form.Group className="mb-2 flex-grow-1">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2" style={{ width: "120px" }}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2" style={{ width: "120px" }}>
                <Form.Label>ZIP</Form.Label>
                <Form.Control
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <Button type="submit" className="mt-2">
              Create Gym
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* MY GYMS LIST */}
      <h3 className="mb-3">My Gyms</h3>

      {gyms.length > 0 ? (
        gyms.map(gym => (
         <GymCard key={gym.id}
  gymData={gym}
  isOwner={user.id === gym.created_by}
  onDelete={handleDeleteGym}
  onUpdate={handleUpdateGym}
/>

        ))
      ) : (
        <p className="text-muted">You haven’t created any gyms yet.</p>
      )}
    </div>
  )
}//same as above; will need to relocate to app.jsx)
