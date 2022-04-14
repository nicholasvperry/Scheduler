//Purpose: Order Card. Also has note edit form.
import React, { useEffect } from "react"
import Swal from "sweetalert2"
import { useState } from "react/cjs/react.development"



//if importing props no not use {}. If importing each prop individually wrap them with {}
export const Schedule = (props) => {
    const customerProp = props.instanceObject.job.customerLocation.customer
    const LocationProp = props.instanceObject.job.customerLocation
    const jobInstanceProp = props.jobInstance


    
    return (
        <>
            
            <div className="scheduleCard">
                <h6>{customerProp.fullName}</h6>
                <div>
                    {LocationProp.streetAddress}<br />
                    {LocationProp.city} , {LocationProp.state} {LocationProp.zip} <br />
                    {props.instanceObject.job.name}<br />
                    {props.instanceObject.job.details}
                </div>
            </div>
        </>

    )
}