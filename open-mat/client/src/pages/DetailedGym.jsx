import {api} from '../api/api'
import {useParams} from 'react-router-dom'
import { useEffect, useState} from 'react';


export default function DetailedGym(){
    const [gymData, setGymData] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        const getGym = async () => {
            try {
                const response = await api.get(`gyms/${id}/`);
                setGymData(response.data); // state updates asynchronously
            } catch(error) {
                console.log(error);
            }
        };
        getGym();
    }, [id]);

    if (!gymData) return <div>Loading...</div>;

    const {name, street, city, state, zip, gym_events = []} = gymData;

    return (
        <div className='border-2'>
            <h2>{name}</h2>
            <h3>{street} {city}, {state} {zip}</h3>
            <h3>Events: {gym_events.map(e => e.event_date).join(", ")}</h3>
            <small>Gym ID: {id}</small>
        </div>
    )
}

