import { Card, Container, ListGroup, Button } from 'react-bootstrap';

export default function ReviewCard({ reviewData }) {
  const { rating, comment, created_at, client } = reviewData;
  const rawName = client?.username || client?.email || "";
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
