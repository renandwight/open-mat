import { Card, Container, ListGroup, Button } from 'react-bootstrap';

export default function ReviewCard({ reviewData }) {
  const { rating, comment, created_at, user } = reviewData;

  return (
    <Container className='d-flex justify-content-center'>
      <Card style={{width: '18rem'}}>
        <ListGroup>
          <ListGroup.Item>Rating: {rating}</ListGroup.Item>
          <ListGroup.Item>Comment: {comment}</ListGroup.Item>
          <ListGroup.Item>Created: {created_at}</ListGroup.Item>
        </ListGroup>
        {/* {user && <li>Reviewer: {user.username}</li>} */}
      </Card>
    </Container>
  );
}