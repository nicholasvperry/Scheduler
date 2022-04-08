import React, { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import { Button } from "reactstrap";

const Job = ({ jobObject}) => {
    const user = JSON.parse(sessionStorage.getItem("userProfile"))
    const navigate = useNavigate()
    const handleJobClick = () => {
        navigate(`/job/${jobObject.id}`)
    }
    return (
        <>
            <div className="jobCard"
            onClick={() => handleJobClick()}
            >
                <h6>{jobObject.name}</h6>
                <div>{jobObject.details}</div>
                    
                
                <br />
                <br />
            </div>
            <br/>
        </>
    );
};

export default Job;