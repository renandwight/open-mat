import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import HomePageCarouse from "../components/Carousel";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to Open Mat</h1>
        <p>Find Brazilian Jiu-Jitsu open-mat sessions near you</p>
        <div>
          <HomePageCarouse />
        </div>
        <div className="features-section">
          <Button as={Link} to="/gyms" variant="outline-primary">
            Search open-mats
          </Button>
        </div>
      </div>

        <Container className="features-section my-5">
          <h2 className="text-center mb-4">What You Can Do</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 text-center">
                <Card.Body>
                  <Card.Title>Browse Gyms</Card.Title>
                  <Card.Text>
                    Find gyms near you by zip code or search by name.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center">
                <Card.Body>
                  <Card.Title>Find Open Mats</Card.Title>
                  <Card.Text>
                    Discover open mat events at gyms in your area.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 text-center">
                <Card.Body>
                  <Card.Title>Learn Techniques</Card.Title>
                  <Card.Text>
                    Visit the Dojo to learn jiu jitsu techniques.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

      <div className="d-flex justify-content-center">
      <Card className="text-center" style={{ width: "70rem"}}>
        <Card.Body>
          <Card.Title>Join Our Community</Card.Title>
          <Card.Text>
            Register to save your favorite gyms and events.
          </Card.Text>
          <Button as={Link} to="/loginsignup" variant="outline-primary">
            Login / Sign-up
          </Button>
        </Card.Body>
      </Card>
      </div>
    </div>
  );
};