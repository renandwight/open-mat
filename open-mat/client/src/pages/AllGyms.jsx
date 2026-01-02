import GymCard from '../components/Gymcard'
import {api} from '../api/api'
import { useEffect, useState} from 'react';
export default function AllGyms(){
    const [gyms, setGyms] = useState([]);

  useEffect(() => {
    const getGyms = async () => {
        console.log('getGyms')
        try {
            const response = await api.get('gyms')
            // console.log(response.data)
            console.log('updating state')
            setGyms(response.data)

        } catch(error) {
            console.log(error)
        }
    }

    getGyms();
  }, [])

  return(
<div className="border-2">
      <h2>All Gyms</h2>
      {gyms.map((g, index) => (
       <GymCard key ={g.id} gymData={g} /> 
      ))}
    </div>
  );

}