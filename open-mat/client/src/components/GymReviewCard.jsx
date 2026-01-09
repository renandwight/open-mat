import { Card, Container, ListGroup, Row, Col } from 'react-bootstrap';

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
    // <Container className='d-flex justify-content-center'>
    //   <Card style={{width: '18rem'}}>
    //     <ListGroup>
    //       {displayName && <ListGroup.Item>Reviewer: {displayName}</ListGroup.Item>}
    //       <ListGroup.Item>Rating: {rating}</ListGroup.Item>
    //       <ListGroup.Item>Comment: {comment}</ListGroup.Item>
    //     </ListGroup>
    //   </Card>
    // </Container>

    <Container className="my-3">
      <Card className="w-100">
        <Card.Body>
          <Row className="align-items-center g-3">
            <Col xs={12} md={3}>
              <Row>
                <center><strong>Reviewer:</strong></center>
              </Row>
              <Row>
                <center>{displayName ?? "Anonymous"}</center>
              </Row>
            </Col>
            <Col xs={12} md={2}>
              <Row>
                <center><strong>Rating:</strong></center>
              </Row>
              <Row>
                <center>{rating}</center>
              </Row>
            </Col>
            <Col xs={12} md={7}>
              <Row>
                <center><strong>Comment:</strong></center>
              </Row>
              <Row>
                <center>{comment}</center>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>



  );
}
