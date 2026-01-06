import { Card, Row, Col, Container, ListGroup } from 'react-bootstrap';

function Eventcard({eventsData}) {
    // {id: 5, event_date: '2026-01-16T18:30:00Z', gi: true, fee: '10.00', open_class: false}
    const { id, gym_id, event_date, gi, fee, open_class} = eventsData
    // console.log(eventsData)
    
    return (
        <Container className="d-flex justify-content-center">
            <Row className="justify-content-center g-4">
                <Col xs={12} md={6} lg={4}>
                    <Card style={{width: '18rem'}}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Event Date: {event_date}</ListGroup.Item>
                            <ListGroup.Item>Gi: {gi===true ? "🥋" : "🚫"}</ListGroup.Item>
                            <ListGroup.Item>Fee: {fee === 0.00 ? "None" : fee}</ListGroup.Item>
                            <ListGroup.Item>Open Class: {open_class===true ? "Yes" : "No"}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default Eventcard;