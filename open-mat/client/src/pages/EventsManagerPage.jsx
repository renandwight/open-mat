import {api} from '../api/api'
import { useEffect, useState} from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Eventcard from '../components/Eventcard';

export default function EventsManager(){

// {
//     "id": 5,
//     "gym_id": 4,
//     "event_date": "2026-01-16T18:30:00Z",
//     "gi": true,
//     "fee": "10.00",
//     "open_class": false
// }

    // retain token across requests
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
        },
        (error) => Promise.reject(error)
    );

    const [events, setEvents] = useState([]) //need use loaderdata (relocate to app.jsx)
    const [gyms, setGyms] = useState([]) //same as above; will need to relocate to app.jsx)
    // set state for form data
    const [newEvent, setNewEvent] = useState({
        gym_id: "", 
        event_date: "",
        gi: false,
        fee: "",
        open_class: false
    })

    // editing events
    const [editId, setEditId] = useState(null);
    const [editDetails, setEdittDetails] = useState({
        event_date: "",
        gi: false,
        fee: "",
        open_class: false
    })

    // get events
    useEffect(() => {
        const getEvents = async () => {
            try {
                const {data, status} = await api.get('events/')
                if (status === 200) {
                    setEvents(data)
                } 
            } catch (error) {
                console.log(error)
            }
        }
        getEvents();
    }, [])
    
    // need gyms since user can create multiple gyms then events off those gyms
        useEffect(() => {
        const getGyms = async () => {
            try {
                const {data, status} = await api.get('gyms/')
                if (status === 200) {
                    setGyms(data)
                } 
            } catch (error) {
                console.log(error)
            }
        }
        getGyms();
    }, [])

    // create
    const createEvent = async (eventObj) => {
        let {data, status} = await api.post("events/", eventObj);
        if (status === 201) {
            return data;
        } else {
            return null
        }
    };

    // handle create
    const handleCreateEvent = async(e) => {
        e.preventDefault();

        try {
            const createdEvent = await createEvent({
                gym_id: Number(newEvent.gym_id),
                event_date: new Date(newEvent.event_date).toISOString(),     //need to create date time format helper
                gi: Boolean(newEvent.gi),
                fee: String(newEvent.fee),
                open_class: Boolean(newEvent.open_class)
            });
            
            setEvents((prev) => [createdEvent, ...prev]);

            // clear / reset form data
            setNewEvent({
                gym_id: "", 
                event_date: "",
                gi: false,
                fee: "",
                open_class: false
            })
        } catch (error) {
            console.log(error)
        }
    };

    // delete
    const removeEvent = async (id) => {
        const response = await api.delete(`events/${id}/`);
        return response.status === 204;
    };

    const dropEvent = async(deleteEvent) => {
        if (await removeEvent(deleteEvent.id)) {
            setEvents((prev) => prev.filter((e) => e.id !== deleteEvent.id));
        }
    };


    // edit / patch events
    const editEvent = async (id, eventObj) => {
        const {data, status} = await api.patch(`events/${id}/`, eventObj);
        if (status === 200) {
            return data;
        }
        throw new Error(status)
    };

    const updateEvent = (updatedEvent) => {
        setEditId(updatedEvent.id);
        setEdittDetails({
            event_date: updatedEvent.event_date ? updatedEvent.event_date.slice(0,16) : "",
            gi: Boolean(updatedEvent.gi),
            fee: updatedEvent.fee ?? "",
            open_class: Boolean(updatedEvent.open_class)
        })
    }

    const handleEdit = async () => {
        const eventData = {
            event_date: new Date(editDetails.event_date).toISOString(),
            gi: Boolean(editDetails.gi),
            fee: editDetails.fee === "" ? null : String(editDetails.fee),
            open_class: Boolean(editDetails.open_class),
        };

        try {
            const updated = await editEvent(editId, eventData);
            setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
            setEditId(null);
        } catch (error) {
            console.log(error);
        }
    };

    const onFormChange = (setter) => (e) => {
        const { name, type, checked, value } = e.target;
        setter((prev) => ({...prev,[name]: type === "checkbox" ? checked : value,}
        ));
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4 text-center">Events Manager</h1>

            {/* CREATE FORM */}
            <Card className="mx-auto mb-4" style={{ maxWidth: 720 }}>
            <Card.Body>
                <Card.Title>Create Event</Card.Title>

                <Form onSubmit={handleCreateEvent}>
                <Row className="g-3">
                    <Col xs={12} md={4}>
                        <Form.Group>
                        <Form.Label>Select Gym</Form.Label>
                            <Form.Select
                                name="gym_id"
                                value={newEvent.gym_id}
                                onChange={onFormChange(setNewEvent)}
                                required
                                disabled={gyms.length === 0}
                            >
                                <option value="">
                                {gyms.length === 0 ? "No gyms available" : "Choose a gym..."}
                                </option>

                                {gyms.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name ? `${g.name}`: "No Gym Created"}
                                </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={8}>
                    <Form.Group>
                        <Form.Label>Date / Time</Form.Label>
                        <Form.Control
                        name="event_date"
                        type="datetime-local"
                        value={newEvent.event_date}
                        onChange={onFormChange(setNewEvent)}
                        required
                        />
                    </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                    <Form.Group>
                        <Form.Label>Fee</Form.Label>
                        <Form.Control
                        name="fee"
                        type="text"
                        placeholder="10.00"
                        value={newEvent.fee}
                        onChange={onFormChange(setNewEvent)}
                        />
                    </Form.Group>
                    </Col>

                    <Col xs={12} md={4} className="d-flex align-items-end">
                    <Form.Check
                        name="gi"
                        type="checkbox"
                        label="GI (🥋)"
                        checked={newEvent.gi}
                        onChange={onFormChange(setNewEvent)}
                    />
                    </Col>

                    <Col xs={12} md={4} className="d-flex align-items-end">
                    <Form.Check
                        name="open_class"
                        type="checkbox"
                        label="Open Class"
                        checked={newEvent.open_class}
                        onChange={onFormChange(setNewEvent)}
                    />
                    </Col>

                    <Col xs={12}>
                    <Button type="submit">Create</Button>
                    </Col>
                </Row>
                </Form>
            </Card.Body>
            </Card>

            {/* EDIT PANEL (shows only when editing) */}
            {editId !== null && (
            <Card className="mx-auto mb-4" style={{ maxWidth: 720 }}>
                <Card.Body>
                <Card.Title>Edit Event (ID: {editId})</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                    Gym cannot be changed after creation.
                </Card.Subtitle>

                <Form
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit();
                    }}
                >
                    <Row className="g-3">
                    <Col xs={12} md={8}>
                        <Form.Group>
                        <Form.Label>Date / Time</Form.Label>
                        <Form.Control
                            name="event_date"
                            type="datetime-local"
                            value={editDetails.event_date}
                            onChange={onFormChange(setEdittDetails)}
                            required
                        />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Group>
                        <Form.Label>Fee</Form.Label>
                        <Form.Control
                            name="fee"
                            type="text"
                            value={editDetails.fee}
                            onChange={onFormChange(setEdittDetails)}
                        />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4} className="d-flex align-items-end">
                        <Form.Check
                        name="gi"
                        type="checkbox"
                        label="GI (🥋)"
                        checked={editDetails.gi}
                        onChange={onFormChange(setEdittDetails)}
                        />
                    </Col>

                    <Col xs={12} md={4} className="d-flex align-items-end">
                        <Form.Check
                        name="open_class"
                        type="checkbox"
                        label="Open Class"
                        checked={editDetails.open_class}
                        onChange={onFormChange(setEdittDetails)}
                        />
                    </Col>

                    <Col xs={12} className="d-flex gap-2">
                        <Button type="submit">Save</Button>
                        <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setEditId(null)}
                        >
                        Cancel
                        </Button>
                    </Col>
                    </Row>
                </Form>
                </Card.Body>
            </Card>
            )}

            {/* EVENTS GRID (3 columns on lg) */}
            <Row className="justify-content-center g-4">
            {events.map((ev) => (
                <Col
                key={ev.id}
                xs={12}
                md={6}
                lg={4}
                className="d-flex justify-content-center"
                >
                <Eventcard
                    eventsData={ev}
                    onEdit={updateEvent}
                    onDelete={dropEvent}
                />
                </Col>
            ))}
            </Row>
        </Container>
    );
};