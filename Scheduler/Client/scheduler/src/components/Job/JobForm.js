import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from 'react-bootstrap/Button';
import { JobModalBackdrop } from "./JobModalBackdrop";
import { JobContext } from "../../Providers/JobProvider";



//make sure to wrap handleClose {}
export const JobForm = ({ handleClose, refreshProps, locationId }) => {

    const {addJob} = useContext(JobContext)

    //Modal Animation
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            }
        },
        exit: {
            y: "80%",
            opacity: 0,

        }
    }

    const [job, setJob] = useState()
    //make a copy of state to manipulate
    const handleControlledInputChange = (event) => {
        //...product make a copy of current state
        const newJob = { ...job }

        //Change copy. name tells which property to change
        newJob[event.target.name] = event.target.value

        //update corrent copy state
        setJob(newJob)

    }
    var jobPrice= parseFloat(job?.price).toFixed(2)

    const handleAddJob = () => {
        
        addJob({
            name: job.name,
            details: job.jobDetails,
            customerLocationId: locationId,
            routeOrderNumber: job.city,
            jobStatusId: 1,
            price: jobPrice,
            billingTypeId: job.billingType
        })
            .then(refreshProps)
    }

    return (

        <>
            <JobModalBackdrop onClick={handleClose}>
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="jobForm"
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >

                    <form className="jobFormBorder">
                        <h2>Job</h2>

                        <div>
                            <div className="jobName">
                                <label htmlFor="jobName">Name: </label>
                                <input type="text" id="jobName" name="name" required autoFocus
                                    placeholder="Name"
                                    onChange={handleControlledInputChange} />
                            </div>
                        </div>

                        

                        <div>
                            <div className="price">
                                <label htmlFor="price">Price: </label>
                                <input type="number" id="price" name="price" required
                                    placeholder="Price"
                                    onChange={handleControlledInputChange} />
                            </div>
                        </div>

                        
                        <div>
                            <div className="billingType">
                                <label htmlFor="billingType">Billing Type : </label>
                                <select name="billingType" required onChange={handleControlledInputChange}>
                                    <option>Select Billing Type</option>
                                    <option value="1">Weekly</option>
                                    <option value="2">Monthly</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="jobDetails">
                                <label htmlFor="jobDetails">Details: </label>
                                <textarea cols="23" rows="2" id="jobDetails" name="jobDetails" required
                                    placeholder="Details"
                                    onChange={handleControlledInputChange} />
                            </div>
                        </div>


                        <Button
                            variant="secondary"
                            onClick={e => {
                                e.preventDefault()
                                handleAddJob()
                                handleClose()
                            }}>Add Job</Button>
                        &nbsp; &nbsp;
                        <Button
                            variant="secondary"
                            onClick={e => {
                                e.preventDefault()
                                handleClose()
                            }}>Cancel</Button>

                    </form>
                </motion.div>

            </JobModalBackdrop>
        </>
    )


}