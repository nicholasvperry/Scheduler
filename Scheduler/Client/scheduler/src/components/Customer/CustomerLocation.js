import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';
import Job from "../Job/Job";
import Button from 'react-bootstrap/Button';


export const CustomerLocation = ({ locationObject, jobOpen, setLocationId }) => {
    
   
    
    return (
        <>
            <div className="locationCard">
                <h3><PersonIcon /> {locationObject.name}</h3>
                <div><HouseIcon /> </div>
                <div>{locationObject.streetAddress}</div>
                <div>{locationObject.city}, {locationObject.state} {locationObject.zip}</div>

                <div className="locationJobs">
                    <Button
                        className="addLocationButton"
                        variant="secondary"
                        onClick={e => {
                            e.preventDefault()
                            setLocationId(locationObject.id)
                            jobOpen()
                            
                        }}
                    >
                        Add Job
                    </Button>
                    <br /><br />
                    <h6>Jobs</h6>
                    {locationObject.jobs.map((jobObject) => (
                        <Job jobObject={jobObject} key={jobObject.id} />
                    ))}
                </div>
                <br />

            </div>
            <br />
        </>

    )
}