import React from "react";
import { useOutletContext } from "react-router-dom";
import { Card, Row, Col, Container, ListGroup } from 'react-bootstrap';

import {api} from '../api/api'
import {Link} from "react-router-dom";
export default function GymCard({gymData}){
    const { id, name,street,city,state,created_by,zip,latitude,longitude,distance,gym_events} = gymData;
   const link=""+id
    return(
        <div>
            <Card style={{width: '60rem'}}>
            
            <Link to={link}><h2> {name}</h2>
            <h3> {street} {city}, {state} {zip}</h3> <p>{distance? "distance"+distance : null}</p>
            <small>gymid {id}</small>
            </Link>
            </Card>
        </div>
    );
}



