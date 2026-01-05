import GymCard from '../components/Gymcard'
import {api} from '../api/api'
import { useEffect, useState} from 'react';
import { useSearchParams} from "react-router-dom"
export default function AllGyms(){
    const [searchParams] = useSearchParams()
    const [gyms, setGyms] = useState([]);
    const nearby=searchParams.get("nearby")
    const search = searchParams.get("search")
    const zip=searchParams.get("zip")
    const radius=searchParams.get("radius") ?? 10
    const city=searchParams.get("city") ?? ""
    const name=searchParams.get("name") ?? ""
    
    console.log(name)
  useEffect(() => {
    const getGyms = async () => {
       
        console.log('getGyms')
        try {
            let endpoint="gyms"
            if (nearby){
                
                endpoint=('gyms/nearby/?zip='+zip+"&radius="+radius)
                
                
            }
            else if (search){
                
               
                endpoint=('gyms/search/?city='+city+"&name="+name)
                
            }
            console.log('updating state')
                
            const response=await api.get(endpoint)
            setGyms(response.data)
            
            // console.log(response.data)
            

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