import GymCard from '../components/Gymcard'
import {api} from '../api/api'
import { useEffect, useState} from 'react';
import { useSearchParams} from "react-router-dom"
export default function AllGyms(){
    const [searchParams, setSearchParams] = useSearchParams()
    const [gyms, setGyms] = useState([]);
    const nearby=searchParams.get("nearby")
    const search = searchParams.get("search")
    const zip=searchParams.get("zip")
    const radius=searchParams.get("radius") ?? 10
    const city=searchParams.get("city") ?? ""
    const name=searchParams.get("name") ?? ""
    const [searchText, setSearchText] = useState("")
    const [zipInput, setZipInput] = useState("")
    const [radiusInput, setRadiusInput] = useState(10)
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
                
               
                endpoint=('gyms/search/?q='+searchText)
                
            }
            else{
              return
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
  }, [searchParams])

  return(
    
<div className="border-2 gym-search-card">
    <div className="input-group mb-3">
  <input
    type="search"
    className="form-control"
    placeholder="Search by gym name or city"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />
  <button
    className="btn btn-primary"
    onClick={() =>
      setSearchParams({
        search: "1",
        q: searchText
      })
    }
  >
    Search
  </button>
</div>
<div className="d-flex gap-2 mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Zip code"
    value={zipInput}
    onChange={(e) => setZipInput(e.target.value)}
  />

  <select
    className="form-select"
    value={radiusInput}
    onChange={(e) => setRadiusInput(e.target.value)}
  >
    <option value={5}>5 miles</option>
    <option value={10}>10 miles</option>
    <option value={25}>25 miles</option>
  </select>

  <button
    className="btn btn-secondary"
    onClick={() =>
      setSearchParams({
        nearby: "1",
        zip: zipInput,
        radius: radiusInput,
      })
    }
  >
    Nearby
  </button>
</div>

      {gyms.length > 0? null : "Looking for something? Search here!"}
      {gyms.map((g, index) => (
       <GymCard key ={g.id} gymData={g} /> 
      ))}
    </div>
  );

}
