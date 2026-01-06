import { formToJSON } from 'axios';
import {api} from '../api/api'
import { useEffect, useState} from 'react';

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

    const [events, setEvents] = useState([]) //need use loaderdata (relocate to app.jsx?)

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
                alert(data)
            }
        }
        getEvents();
    }, [])
    
    // create
    const createEvent = async (eventObj) => {
        let {data, status} = await api.post("events/", eventObj);
        if (status === 201) {
            return data;
        } else {
            alert(data);
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
    }

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

    const handleEdit = async (e) => {
        e.preventDefault()
        
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


    return (
        <div className='border-2'>
            <h1>Events Manager</h1>
        </div>
    )
}