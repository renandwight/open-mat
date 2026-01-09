import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function ReviewCard({ reviewData }) {
  const { rating, comment, created_at, gym, gym_name } = reviewData;
  const gymId = gym;
  const gymName = gym_name;

  return (
    <Container className="my-3">
      <Card className="w-100">
        <Card.Body>
          <Row className="align-items-center g-3">
            <Col xs={12} md={3}>
              <Row>
                <center><strong>Gym:</strong></center>
              </Row>
              <Row>
                <center>
                  {gymId ? (
                    <Link to={`/gyms/${gymId}`}>
                      {gymName || "View Gym"}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </center>
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
            <Col xs={12} md={5}>
              <Row>
                <center><strong>Comment:</strong></center>
              </Row>
              <Row>
                <center>{comment}</center>
              </Row>
            </Col>
            <Col xs={12} md={2}>
              <Row>
                <center><strong>Created:</strong></center>
              </Row>
              <Row>
                <center>{created_at}</center>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};