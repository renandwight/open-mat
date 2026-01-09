import { Card, Container, Row, Col } from "react-bootstrap";

export default function GymReviewCard({ reviewData }) {
  const { rating, comment, created_at, client } = reviewData;

  let rawName = "";
  if (client) {
    if (client.username) rawName = client.username;
    else if (client.email) rawName = client.email;
  }
  const displayName = rawName.includes("@") ? rawName.split("@")[0] : rawName;

  const formatDateTime = (datetimeObj) => {
    const datetime = new Date(datetimeObj);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium"
    }).format(datetime);
  };

  return (
    <Container className="my-3">
      <Card className="w-100">
        <Card.Body>
          <Row className="align-items-center g-3">
            {/* Reviewer */}
            <Col xs={12} md={3}>
              <Row>
                <center>
                  <strong>Reviewer:</strong>
                </center>
              </Row>
              <Row>
                <center>{displayName || "Anonymous"}</center>
              </Row>
            </Col>

            {/* Rating */}
            <Col xs={12} md={2}>
              <Row>
                <center>
                  <strong>Rating:</strong>
                </center>
              </Row>
              <Row>
                <center>{rating}</center>
              </Row>
            </Col>

            {/* Comment */}
            <Col xs={12} md={5}>
              <Row>
                <center>
                  <strong>Comment:</strong>
                </center>
              </Row>
              <Row>
                <center>{comment}</center>
              </Row>
            </Col>

            {/* Created */}
            <Col xs={12} md={2}>
              <Row>
                <center>
                  <strong>Created:</strong>
                </center>
              </Row>
              <Row>
                <center>{created_at ? formatDateTime(created_at) : "—"}</center>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
