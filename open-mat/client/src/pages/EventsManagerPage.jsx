import { formToJSON } from 'axios';
import {api} from '../api/api'
import { useEffect, useState} from 'react';

export default function EventsManager(){
//------------------------------------CURRENT ISSUE/PROBLEM----------------------------------------
//-----GYM ID IS REQUIRED ON REQUESTS; ADDITIONALLY, THERE SHOULD BE 1-TO-1 RELATIONSHIP-----------
//-----BETWEEN USER AND GYM; CURRENTLY 1 TO MANY; NEED INSIGHT/GUIDANCE/INPUT----------------------
//-----NEED TO REVIEW MODELS AGAIN-----------------------------------------------------------------

//     {
//   "gym_id": 7,
//   "event_date": "2026-01-16T18:30:00Z",
//   "gi": true,
//   "fee": "10",
//   "open_class": false
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

    // creating events
    const [newEvent, setNewEvent] = useState({
        gym_id: "", 
        event_date: "", //need to create date time format helper
        gi: false,
        fee: "",
        open_class: false
    })

    // editing events
    const [editId, setEditId] = useState(null);
    const [editDetails, setEdittDetails] = useState({
        gym_id: "",
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
        let createdEvent = await createEvent({
            gym_id: '', // added '' temporarily 
            event_date: '', //???
            gi: Boolean(newEvent.gi),
            fee: String(newEvent.fee),
            open_class: Boolean(newEvent.open_class)
        });
        if (createdEvent) {
            setEvents((prev) => [createdEvent, ...prev]);
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

    const editEvent = async (event) => {
        const {data, status} = await api.put(`events/${event.id}/`, event);
        if (status === 200) {
            return data;
        }
    };


    //-------------------------------------INWORK-------------------------------------------------
    const updateEvent = async(updatedEvent) => {
        updatedEvent = await editEvent(updatedEvent)
        setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent: event)))
    }

    const handleClick = () => {
        let updatedEvent = {
            gym_id: '', // added '' temporarily 
            event_date: '', // added '' temporarily 
            gi: '', // added '' temporarily 
            fee: '', // added '' temporarily 
        }
        updateEvent(updatedEvent)
    }


    return (
        <div className='border-2'>
            <h1>Events Manager</h1>
        </div>
    )
}