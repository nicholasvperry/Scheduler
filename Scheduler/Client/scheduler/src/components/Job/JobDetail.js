import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { JobContext } from "../../Providers/JobProvider";
import Button from 'react-bootstrap/Button';
import { JobInstanceContext } from "../../Providers/JobInstanceProvider";
import JobInstance from "../JobInstance/JobInstance";
import { ConstructionOutlined } from "@mui/icons-material";


export const JobDetails = () => {
    const { getJobById } = useContext(JobContext);
    const { getInstancesByJobId, addInstance } = useContext(JobInstanceContext);
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
        getInstancesByJobId(id)
            .then(setJobInstances)

    }, [refreshProps]);

    //this needed to be added because when page loads there is no job
    if (!job) {
        return null;
    }

    if (!jobInstances) {
        return null;
    }
    
    //get main route order number to add to new job instance
    const routeOrderNumber = job.routeOrderNumber

    const handleAddModal = () => {
        Swal.fire({
            title: 'Service',
            html: `<input type="text" id="name" class="swal2-input" placeholder="Name">
            <textarea cols="30" rows="5" id="details" class="swal2-input" placeholder="Details"></textarea>
            <div>Schedule Date</div>
            <input type="date" class="swal2-input" id="isPaid">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkbox1">
                <label class="form-check-label" for="checkbox1">
                    checkbox1
                </label>
            </div>
            `,
            confirmButtonText: 'Save',
            focusConfirm: false,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value
                const details = Swal.getPopup().querySelector('#details').value
                const isPaid = Swal.getPopup().querySelector('#isPaid').value.checked
                if (!name || !details) {
                    Swal.showValidationMessage(`Please enter name and details`)
                }
                return { name: name, details: details, isPaid: isPaid }
               
            }
        }).then((result) => {
            if (result.isConfirmed) {
                debugger
                console.log(result.value.name)
                console.log(result.value.details)
                console.log(result.value.isPaid)
                // addInstance({
                //     name: result.value.name,
                //     details: result.value.details
                // })
                //     .then(setRefreshProps) //setSwalProps just to update state to refresh comments

            }
        })


    }





    return (
        <>
            <div className="jobDetailCard">
                <div className="jobName">
                    <h1>Property Details</h1>
                </div>
                <Button
                    className="addJob"
                    variant="secondary"
                    onClick={handleAddModal}
                >Add Service</Button>
                <Button
                    className="jobDetailsButton backButton"
                    variant="secondary"
                    onClick={() => navigate(-1)}
                >Back To Locations</Button>

                <br />
                <div className="jobLocationCard">
                    <h6>Client</h6>
                    <div>{job.customerLocation.customer.fullName}</div>
                    <br />
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
                                {jobInstances.map((jobInstance) => {
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
                                {jobInstances.map((jobInstance) => {
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
                                {jobInstances.map((jobInstance) => {
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
