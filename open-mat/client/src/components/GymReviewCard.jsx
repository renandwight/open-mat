import { Card, Container, ListGroup } from 'react-bootstrap';

export default function GymReviewCard({ reviewData }) {
  const { rating, comment, created_at, client } = reviewData;
  let rawName = "";
  if (client) {
    if (client.username) {
      rawName = client.username;
    } else if (client.email) {
      rawName = client.email;
    }
  }
  const displayName = rawName.includes("@") ? rawName.split("@")[0] : rawName;

  return (
    <Container className='d-flex justify-content-center'>
      <Card style={{width: '18rem'}}>
        <ListGroup>
          {displayName && <ListGroup.Item>Reviewer: {displayName}</ListGroup.Item>}
          <ListGroup.Item>Rating: {rating}</ListGroup.Item>
          <ListGroup.Item>Comment: {comment}</ListGroup.Item>
          <ListGroup.Item>Created: {created_at}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}
