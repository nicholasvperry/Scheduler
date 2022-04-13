import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { JobContext } from "../../Providers/JobProvider";
import Button from 'react-bootstrap/Button';
import { JobInstanceContext } from "../../Providers/JobInstanceProvider";
import JobInstance from "../JobInstance/JobInstance";
import { ConstructionOutlined } from "@mui/icons-material";
import { InstanceForm } from "../JobInstance/JobInstanceForm";
import {motion} from "framer-motion"



export const JobDetails = () => {
    const { getJobById } = useContext(JobContext);
    const { getJobInstancesByJobId, addInstance, jobInstancesById } = useContext(JobInstanceContext);
    const { id } = useParams();
    const [job, setJob] = useState()
    const [jobInstances, setJobInstances] = useState()
    const navigate = useNavigate();
    //added this just to be able to update state
    //Added swalProps to useEffect and setSwalProps to add comment
    //When addComment set swalProps useEffect updates stat and refreshes comments
    const [refreshProps, setRefreshProps] = useState()

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))


    useEffect(() => {
        getJobById(id)
            .then(setJob)

    }, [refreshProps]);

    useEffect(() => {
        getJobInstancesByJobId(id)
            

    }, [refreshProps]);

    //this needed to be added because when page loads there is no job
    if (!job) {
        return null;
    }

   
    
    //get main route order number to add to new job instance
    const routeOrderNumber = job.routeOrderNumber



    return (
        <>
            <div className="jobDetailCard">
                <div className="jobName">
                    <h1>Job Details</h1>
                </div>
                <Button
                    className="addJob"
                    variant="secondary"
                    onClick={() => navigate(`/addservice/${id}`)}
                >Add Service</Button>
                <Button
                    className="jobDetailsButton backButton"
                    variant="secondary"
                    onClick={() => navigate(`/customer/${job.customerLocation.customer.id}`)}
                >Back To Locations</Button>

                <br />
                <div className="jobLocationCard">
                    <h6>Client</h6>
                    <div>{job.customerLocation.customer.fullName}</div>
                    <div>{job.customerLocation.customer.phoneNumber}</div>
                    <div>{job.customerLocation.customer.email}</div>
                    <br />
                    <h6>Address</h6>
                    <div>{job.customerLocation.streetAddress}</div>
                    <div>{job.customerLocation.city}, {job.customerLocation.state} {job.customerLocation.zip}</div>
                </div>
                <br />

                <div className="unscheduledInstances">
                    <h6>Unscheduled Services</h6>
                    <div className="unscheduledJobCards">
                        <table cellPadding={15} cellSpacing={0} className="customerTable">
                            <thead>
                                <tr className="tableRowName">
                                    <th className="icon"></th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Details
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {jobInstancesById.map((jobInstance) => {
                                    //return jobInstance.scheduleDate !== null ?  <JobInstance jobObject={job} jobInstanceObject={jobInstance} key={jobInstance.id} /> :<></>
                                    if (jobInstance.scheduleDate == null) {

                                        return (
                                            <JobInstance jobObject={job} jobInstanceObject={jobInstance} key={jobInstance.id} />

                                        )
                                    }

                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="upcomingInstances">
                    <h6>Upcoming Services</h6>
                    <div className="upcomingJobCards">
                        <table cellPadding={15} cellSpacing={0} className="customerTable">
                            <thead>
                                <tr className="tableRowName">
                                    <th className="icon"></th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Details
                                    </th>
                                    <th>
                                        Scheduled Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobInstancesById.map((jobInstance) => {
                                    //return jobInstance.scheduleDate !== null ?  <JobInstance jobObject={job} jobInstanceObject={jobInstance} key={jobInstance.id} /> :<></>
                                    if (jobInstance.scheduleDate !== null && !jobInstance.completedDate) {

                                        return (
                                            <JobInstance jobObject={job} jobInstanceObject={jobInstance} key={jobInstance.id} />

                                        )
                                    }

                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="completedInstances">
                    <h6>Completed Services</h6>
                    <div className="completedJobCards">
                        <table cellPadding={15} cellSpacing={0} className="customerTable">
                            <thead>
                                <tr className="tableRowName">
                                    <th className="icon"></th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Details
                                    </th>
                                    <th>
                                        Scheduled Date
                                    </th>
                                    <th>
                                        Completed Date
                                    </th>
                                    <th>
                                        Completed By
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobInstancesById.map((jobInstance) => {
                                    //return jobInstance.scheduleDate !== null ?  <JobInstance jobObject={job} jobInstanceObject={jobInstance} key={jobInstance.id} /> :<></>
                                    if (jobInstance.completedDate) {

                                        return (
                                            <JobInstance jobObject={job} jobInstanceObject={jobInstance} key={jobInstance.id} />

                                        )
                                    }

                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
};
