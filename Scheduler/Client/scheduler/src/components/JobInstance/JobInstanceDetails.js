import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import { JobInstanceContext } from "../../Providers/JobInstanceProvider";
import { CustomerContext } from "../../Providers/CustomerProvider";
import Moment from "moment";


export const JobInstanceDetails = () => {
    const { getInstancesByJobId, updateInstance } = useContext(JobInstanceContext);
    const { GetCustomerByInstanceIdWithJobInformation } = useContext(CustomerContext)
    const { id } = useParams();
    const [jobInstance, setJobInstances] = useState()
    const [customerInstance, setCustomerInstance] = useState()
    const navigate = useNavigate();
    //added this just to be able to update state
    //Added swalProps to useEffect and setSwalProps to add comment
    //When addComment set swalProps useEffect updates stat and refreshes comments
    const [refreshProps, setRefreshProps] = useState()

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    //add refr
    useEffect(() => {
        getInstancesByJobId(id)
            .then(setJobInstances)

    }, [refreshProps]);

    useEffect(() => {
        GetCustomerByInstanceIdWithJobInformation(id)
            .then(setCustomerInstance)

    }, [refreshProps]);

    //this needed to be added because when page loads there is no customer
    if (!jobInstance) {
        return null;
    }
    if (!customerInstance) {
        return null;
    }

    const handleEditModal = () => {
        Swal.fire({
            title: 'Comment',
            html: `<input type="text" id="subject" class="swal2-input" placeholder="Subject">
            <textarea cols="30" rows="5" id="content" class="swal2-input" placeholder="Content">`,
            confirmButtonText: 'Save',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const subject = Swal.getPopup().querySelector('#subject').value
                const content = Swal.getPopup().querySelector('#content').value
                if (!subject || !content) {
                    Swal.showValidationMessage(`Please enter subject and content`)
                }
                return { subject: subject, content: content }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                updateInstance({
                    postId: id,
                    userProfileId: user.id,
                    subject: result.value.subject,
                    content: result.value.content
                })
                    .then(refreshProps) //setSwalProps just to update state to refresh comments

            }
        })
    }



    let jobObject = customerInstance.customerLocations[0].jobs[0]
    let instanceObject = customerInstance.customerLocations[0].jobs[0].jobInstances[0]

    let scheduledDate = Moment(instanceObject.scheduleDate).format(`MM-DD-YYYY`)
    let completedDate = Moment(instanceObject.completedDate).format(`MM-DD-YYYY`)
    let userCompleted = customerInstance.customerLocations[0].jobs[0].jobInstances[0].user.fullName

    return (
        <>

            <div className="jobInstanceDetailCard">
                <div className="backButton">
                    <Button
                        className="customerDetailsButton backButton"
                        variant="secondary"
                        onClick={() => navigate(-1)}
                    >Back To Property Details</Button>
                    <br />
                </div>

                <div className="headerName">
                    <h4>Service</h4>
                </div>

                <div className="customerInformation">
                    <h6>{customerInstance.fullName}</h6>
                    <div>{customerInstance.phoneNumber}</div>
                    <div>{customerInstance.email}</div>
                </div>
                <br/>
                <div className="propertyInformation">
                    <h6>{customerInstance.customerLocations[0].name}</h6>
                    <div>{customerInstance.customerLocations[0].fullAddress}</div>
                </div>
                <br/>
                <div className="jobInformation">
                    <h6>Job Information</h6>
                    <div>{jobObject.name}</div>
                    <div>{jobObject.details}</div>
                </div>
                <br/>
                <div className="instanceStatus">
                    <h6>Status</h6>
                    {instanceObject.scheduleDate && !instanceObject.completedDate ? <div>Scheduled for: {scheduledDate}</div> : instanceObject.scheduleDate && instanceObject.completedDate ? <div>Completed on {completedDate}<div>Completed By {userCompleted}</div></div> : <div>Unscheduled</div>}
                    

                </div>


            </div>
        </>
    );
};
