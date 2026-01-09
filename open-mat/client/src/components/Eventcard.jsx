import { Card, Container, ListGroup, Button } from 'react-bootstrap';

function Eventcard({eventsData, onEdit, onDelete}) {
    const { id, gym_id, gym_name, event_date, gi, fee, open_class} = eventsData

    // console.log(gym_name.slice(0,gym_name.indexOf("located")).trim())

    let gym_name_trimmed = gym_name.slice(0,gym_name.indexOf("located")).trim()
    
    // date time formatter
    const formatDateTime = (datetimeObj) => {
        const datetime = new Date(datetimeObj);
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
                    <ListGroup.Item>{gym_name_trimmed}</ListGroup.Item>
                    <ListGroup.Item>Event Date: {formatDateTime(event_date)}</ListGroup.Item>
                    <ListGroup.Item>Gi: {gi===true ? "🥋" : "🚫"}</ListGroup.Item>
                    <ListGroup.Item>Fee: {fee === 0.00 ? "None" : fee}</ListGroup.Item>
                    <ListGroup.Item>Open Class: {open_class===true ? "Yes" : "Members Only"}</ListGroup.Item>
                </ListGroup>
                
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