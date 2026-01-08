import { Link } from 'react-router-dom';
import { Card, Container, ListGroup } from 'react-bootstrap';

export default function ReviewCard({ reviewData }) {
  const { rating, comment, created_at, gym, gym_name } = reviewData;
  const gymId = gym;
  const gymName = gym_name;

  return (
    <Container className='d-flex justify-content-center'>
      <Card style={{width: '18rem'}}>
        <ListGroup>
          {gymId && (
            <ListGroup.Item>
              Gym:{" "}
              <Link to={`/gyms/${gymId}`}>
                {gymName || "View Gym"}
              </Link>
            </ListGroup.Item>
          )}
          <ListGroup.Item>Rating: {rating}</ListGroup.Item>
          <ListGroup.Item>Comment: {comment}</ListGroup.Item>
          <ListGroup.Item>Created: {created_at}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}
