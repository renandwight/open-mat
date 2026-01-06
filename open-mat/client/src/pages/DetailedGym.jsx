import {api} from '../api/api'
import {useParams} from 'react-router-dom'
import { useEffect, useState} from 'react';
import {Card, ListGroup,Button} from 'react-bootstrap'
import Eventcard from '../components/Eventcard';
import { useAuth } from '../context/AuthContext';

import {Link} from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'


export default function DetailedGym(){
    const [gymData, setGymData] = useState(null)
    const { id } = useParams();
    const [isFavorited, setIsFavorited] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const { isAuthenticated, user} = useAuth();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!id) return;
        const getGym = async () => {
            try {
                const response = await api.get(`gyms/${id}/`);
                setGymData(response.data); 
                
            } catch(error) {
                console.log(error);
            }
        };
        
        getGym();
        if (!isAuthenticated) return;
        const checkOwner = async () => { 
            
            
        }
        
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
    }, [id, isAuthenticated,token]);
    useEffect(() => {
  if (!isAuthenticated || !gymData || !user) return

  if (gymData.created_by === user.id) {
    setIsOwner(true)
  }
}, [gymData, isAuthenticated, user])
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
    if (!gymData) return <div>Loading...</div>;

    const {name, street, city, state, zip, gym_events, reviews} = gymData;

   return (
    <div className="container mt-4">

      {/* HEADER */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="mb-1">{name}</h2>
              <h5 className="text-muted">
                {street}, {city}, {state} {zip}
              </h5>
            </div>
             
        
            {isAuthenticated && (
                <div className="d-flex flex-column align-items-end gap-2">
              <Button
                size="sm"
                variant={isFavorited ? "outline-danger" : "outline-primary"}
                onClick={toggleFavorite}
              >
                {isFavorited ? "★ Favorited" : "☆ Add Favorite"}
              </Button>
              {isOwner && (
                <Button
                 size="sm"
                variant="outline-secondary"
                    >
                Edit Gym
                 </Button>
            )}
          </div>
        )}
        </div>
        </Card.Body>
      </Card>

      {/* EVENTS */}
      <h3 className="mb-3">Events</h3>
      <div className="d-flex flex-wrap gap-3 mb-4">
        {gym_events.map(event => (
          <Card key={event.id} style={{ width: '18rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Event Date: {event.event_date}
              </ListGroup.Item>
              <ListGroup.Item>
                Gi: {event.gi ? "🥋" : "🚫"}
              </ListGroup.Item>
              <ListGroup.Item>
                Fee: {event.fee === 0.0 ? "None" : event.fee}
              </ListGroup.Item>
              <ListGroup.Item>
                Open Class: {event.open_class ? "Yes" : "No"}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>

      {/* REVIEWS */}
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <ReviewCard key={review.id} reviewData={review} />
        ))
      ) : (
        <h5 className="text-muted">
          This gym has no reviews? <Link>Add one?</Link>
        </h5>
      )}

      <small className="text-muted">Gym ID: {id}</small>
    </div>
  )
};

