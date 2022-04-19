import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../../Providers/JobProvider";
import Button from 'react-bootstrap/Button';
import { JobInstanceContext } from "../../Providers/JobInstanceProvider";
import JobInstance from "../JobInstance/JobInstance";




export const ScheduleJobDetails = () => {
    const { getJobById } = useContext(JobContext);
    const { getJobDetailInstancesByJobId, addInstance, jobInstancesById } = useContext(JobInstanceContext);
    const { id } = useParams();
    const [job, setJob] = useState()
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
        getJobDetailInstancesByJobId(id)


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
                <div className="sticky">
                    <div className="jobName">
                        <h1>Job Details</h1>
                    </div>
                    <div className="jobDetailsButtons">
                        <Button
                            className="addJob"
                            variant="secondary"
                            onClick={() => navigate(`/addservice/${id}`)}
                        >Add Service</Button>

                        <Button
                            className="jobDetailsButton backButton"
                            variant="secondary"
                            onClick={() => navigate(`/schedule/${user.id}`)}
                        >Back To Schedule</Button>
                    </div>
                    <br />
                    <div className="jobLocationCard">
                        <div>
                            <h6>Customer</h6>
                            <div>{job.customerLocation.customer.fullName}</div>
                            <div>{job.customerLocation.customer.phoneNumber}</div>
                            <div>{job.customerLocation.customer.email}</div>
                        </div>
                        <div>
                            <h6>Address</h6>
                            <div>{job.customerLocation.streetAddress}</div>
                            <div>{job.customerLocation.city}, {job.customerLocation.state} {job.customerLocation.zip}</div>
                        </div>

                        <div className="unscheduledInstances">
                            <h3 className="stickyHeader">Unscheduled Services</h3>
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
                    </div>
                </div>
                <br />


                <div className="scheduledServices">
                    <div className="upcomingInstances">
                        <div></div>
                        <h3 className="stickyHeader scheduledHeader">Upcoming Services</h3>
                        <div className="upcomingJobCards">
                            <table cellPadding={15} cellSpacing={0} className="customerTable">
                                <thead>
                                    <tr className="tableRowName">
                                        <th className="icon"></th>

                                        <th>
                                            Date
                                        </th>
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
                        <div className="tableHeader">
                        <h3 className="stickyHeader">Completed Services</h3>
                        <div className="completedJobCards">
                        </div>
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

            </div>
        </>
    );
};
