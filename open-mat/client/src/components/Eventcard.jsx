import { Card, Container, ListGroup, Button } from 'react-bootstrap';

function Eventcard({eventsData, onEdit, onDelete}) {
    // {id: 5, event_date: '2026-01-16T18:30:00Z', gi: true, fee: '10.00', open_class: false}
    const { id, gym_id, event_date, gi, fee, open_class} = eventsData
    // console.log(eventsData)
    
    // date time formatter
    const formatDateTime = (datetimeObj) => {
        const datetime = new Date(datetimeObj);
        // return isNaN(d.getTime()) ? iso : d.toLocaleString();
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(datetime);
    };

    if (!eventsData) return <div>Loading...</div>;

    if (eventsData.length === 0) return <div>Please create an Event</div>;

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{width: '18rem'}}>
                <ListGroup variant="flush">
                    <ListGroup.Item>Event Date: {formatDateTime(event_date)}</ListGroup.Item>
                    <ListGroup.Item>Gi: {gi===true ? "🥋" : "🚫"}</ListGroup.Item>
                    <ListGroup.Item>Fee: {fee === 0.00 ? "None" : fee}</ListGroup.Item>
                    <ListGroup.Item>Open Class: {open_class===true ? "Yes" : "No"}</ListGroup.Item>
                </ListGroup>

                {/*need buttons for editing and deleting*/}

                <Card.Body className="d-flex justify-content-between">
                    <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => onEdit(eventsData)}
                    >
                    Edit
                    </Button>

                    <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onDelete(eventsData)}
                    >
                    Delete
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default Eventcard;