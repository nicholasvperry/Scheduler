import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import { Button } from "reactstrap";
import { CustomerContext } from "../../Providers/CustomerProvider";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Moment from "moment";


const JobInstance = ({ jobObject, jobInstanceObject }) => {
    const navigate = useNavigate()
    // const {  } = useContext(CustomerContext)
    
    let scheduledDate = Moment(jobInstanceObject.scheduleDate).format(`MM-DD-YYYY`)
    let completedDate = Moment(jobInstanceObject.completedDate).format(`MM-DD-YYYY`)

    const handleClickRow = () => {
        navigate(`/jobInstance/${jobInstanceObject.id}`)
    }

    return (
        <>
            <tr
                key={jobObject.id}
                onClick={() => handleClickRow()}
                className="customerRow tableRow"
            >
                <td>

                </td>

                {jobInstanceObject.scheduleDate ? <td>
                    {scheduledDate}
                </td> : ""}

                <td>
                    <PersonSearchIcon /> {jobObject.name}
                </td>
                <td>
                    {jobObject.details}
                </td>


                {jobInstanceObject.completedDate ? <td>
                    {completedDate}
                </td> : ""}
                {jobInstanceObject.user.fullName ? <td>{jobInstanceObject.user.fullName}</td> : ""}

            </tr>
        </>
    );
};

export default JobInstance;