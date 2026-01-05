import React from "react";
import { useOutletContext } from "react-router-dom";
import {api} from '../api/api'

export default function GymCard({gymData}){
    const { id, name,street,city,state,created_by,zip,latitude,longitude,distance,gym_events} = gymData;
    return(
        <div>
            <h2> {name}</h2>
            <h3> {street} {city}, {state} {zip}</h3>
            <small>gymid {id}</small>
        </div>
    );
}



