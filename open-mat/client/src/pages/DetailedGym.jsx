import {api} from '../api/api'
import {useParams} from 'react-router-dom'
import { useEffect, useState} from 'react';
import Eventcard from '../components/Eventcard';
import {Link} from 'react-router-dom'


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

    const {name, street, city, state, zip, gym_events, reviews = []} = gymData;

    return (
        <div className='border-2'>
            <h2>{name}</h2>
            <h3>{street} {city}, {state} {zip}</h3>
             {gym_events.map((k,v)=>(
                <Eventcard key={k.id} eventsData={k} />
            ))}
            <h3>Reviews:</h3>
            {reviews.length>0 ? <h3> {reviews.map(r=>r.rating)}</h3> : <h3>This gym has no reviews? <Link>Add one?</Link></h3>}
            <small>Gym ID: {id}</small>
        </div>
    )
}

