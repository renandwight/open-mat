import {api} from '../api/api'
import { useEffect, useState} from 'react';
import Eventcard from '../components/Eventcard';

function AllEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await api.get('events')
                setEvents(response.data)
            } catch(error) {
                console.log(error)
            }
        }
        getEvents();
    }, [])

    // console.log("alleventspage", events)

    return(

        <div>
            <h1>Hello Event</h1>
            {events.map((k,v)=>(
                <Eventcard key={k.id} eventsData={k} />
            ))}
        </div>

  );
};
export default AllEvents;