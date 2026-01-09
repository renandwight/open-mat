import {api} from '../api/api'
import {useParams} from 'react-router-dom'
import { useEffect, useState} from 'react';
import {Card, ListGroup,Button} from 'react-bootstrap'
import Eventcard from '../components/Eventcard';
import { useAuth } from '../context/AuthContext';
import EditGymModal from "../components/EditGymModal";
import {Link} from 'react-router-dom'
import GymReviewCard from '../components/GymReviewCard'


export default function DetailedGym(){
    const [gymData, setGymData] = useState(null)
    const { id } = useParams();
    const [isFavorited, setIsFavorited] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const { isAuthenticated, user} = useAuth();
    const token = localStorage.getItem('token');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [reviewError, setReviewError] = useState(null);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);


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
                        setIsFavorited(response.data.some(fav => fav.gym_details.id === Number(id)));
                    } catch (error) {
                        console.log(error);
                    }
                };
                checkFavorite();
    }, [id, isAuthenticated,token]);
    useEffect(() => {
  if (!isAuthenticated || !gymData || !user) return
  console.log(user, gymData.created_by)
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

    const submitReview = async (e) => {
      e.preventDefault();
      setReviewError(null);

      if (!isAuthenticated) {
        setReviewError("You must be logged in to leave a review.");
        return;
      }

      try {
        setIsSubmittingReview(true);

        const payload = {
          gym: Number(id),
          rating: Number(rating),
          comment,
        };

        const res = await api.post("reviews/", payload, {
          headers: { Authorization: `Token ${token}` },
        });

        // res.data should be the created review (ideally using ReviewReadSerializer)
        const newReview = res.data;

        // Update local UI immediately
        setGymData((prev) => ({
          ...prev,
          reviews: [newReview, ...(prev.reviews || [])],
        }));

        // reset form
        setRating(5);
        setComment("");
      } catch (err) {
        console.log(err);
        const msg =
          err?.response?.data
            ? JSON.stringify(err.response.data)
            : "Failed to submit review.";
        setReviewError(msg);
      } finally {
        setIsSubmittingReview(false);
      }
    };

    // date time formatter
    const formatDateTime = (datetimeObj) => {
        const datetime = new Date(datetimeObj);
        // return isNaN(d.getTime()) ? iso : d.toLocaleString();
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(datetime);
    };


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
                {isFavorited ? "Remove Favorite" : "Add Favorite"}
              </Button>
              
          </div>
        )}
        </div>
        </Card.Body>
      </Card>

      {/* EVENTS */}
      <h3 className="mb-3">Events</h3>
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        {gym_events.map(event => (
          <Card key={event.id} style={{ width: '18rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Event Date: {formatDateTime(event.event_date)}
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

      {isAuthenticated ? (
        <Card className="mb-3">
          <Card.Body>
            <h5 className="mb-3">Leave a review</h5>

            <form onSubmit={submitReview}>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {[1,2,3,4,5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What was your experience like?"
                />
              </div>

              {reviewError && (
                <div className="text-danger mb-2">{reviewError}</div>
              )}

              <Button type="submit" disabled={isSubmittingReview}>
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Card.Body>
        </Card>
      ) : (
        <h5 className="text-muted">
          Log in to leave a review.
        </h5>
      )}

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <GymReviewCard key={review.id} reviewData={review} />
        ))
      ) : (
        <h5 className="text-muted">
          This gym has no reviews.
        </h5>
      )}


    </div>
  )
};
