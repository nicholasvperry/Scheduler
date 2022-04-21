import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import { JobInstanceContext } from "../../Providers/JobInstanceProvider";
import { CustomerContext } from "../../Providers/CustomerProvider";
import Moment from "moment";
import { UserJobInstanceContext } from "../../Providers/UserJobInstanceProvider";
import { UserContext } from "../../Providers/UserProvider";
import { Input } from "@mui/icons-material";


export const JobInstanceDetails = () => {
    const { getJobInstancesByJobId, updateInstance, jobInstancesById } = useContext(JobInstanceContext);
    const { getUserInstancesByJobInstanceId, addUserInstance, deleteInstance } = useContext(UserJobInstanceContext)
    const { GetCustomerByInstanceIdWithJobInformation } = useContext(CustomerContext)
    const { getAllUsers, users } = useContext(UserContext)

    const [employeeChecked, setEmployeeChecked] = useState([]);


    const { id } = useParams();
    const [jobInstance, setJobInstances] = useState([])
    const [customerInstance, setCustomerInstance] = useState()
    //set state as empty array
    const [userJobInstances, setUserJobInstances] = useState([])
    const navigate = useNavigate();
    //added this just to be able to update state
    //Added swalProps to useEffect and setSwalProps to add comment
    //When addComment set swalProps useEffect updates stat and refreshes comments
    const [refreshProps, setRefreshProps] = useState()

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        getAllUsers()
    }, [])

    // useEffect(() => {
    //     getJobInstancesByJobId(id)

    // }, [refreshProps]);

    useEffect(() => {
        GetCustomerByInstanceIdWithJobInformation(id)
            .then(setCustomerInstance)

    }, [refreshProps]);

    useEffect(() => {
        
        getUserInstancesByJobInstanceId(id)
            .then(setUserJobInstances)
    }, [refreshProps])
    // debugger

    //this needed to be added because when page loads there is no customer
    if (!customerInstance) {
        return null;
    }
    if (!userJobInstances) {
        return null;
    }


    const handleRemoveSchedule = (e) => {
        
        alert(e.target.value)
    }

    //pulls the userId from the e.target.value
    const handleAddSchedule = (e) => {
        addUserInstance({
            jobInstanceId: id,
            userId: e.target.value,
            timeIn: null,
            timeOut: null
        }).then(setRefreshProps)
        alert(e.target.value)
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
                    >Back</Button>
                    <br />
                </div>

                <div className="headerName">
                    <h2>Service</h2>
                </div>

                <div className="customerInformation">
                    <h5>{customerInstance.fullName}</h5>
                    <div>{customerInstance.phoneNumber}</div>
                    <div>{customerInstance.email}</div>
                </div>
                <br />
                <div className="propertyInformation">
                    <h5>{customerInstance.customerLocations[0].name}</h5>
                    <div>{customerInstance.customerLocations[0].fullAddress}</div>
                </div>
                <br />
                <div className="jobInformation">
                    <h5>Job Information</h5>
                    <div>{jobObject.name}</div>
                    <div>{jobObject.details}</div>
                </div>
                <br />
                <div className="instanceStatus">
                    <h5>Status</h5>
                    {instanceObject.scheduleDate && !instanceObject.completedDate ? <div>Scheduled for: {scheduledDate}</div> : instanceObject.scheduleDate && instanceObject.completedDate ? <div>Completed on {completedDate}<div>Completed By {userCompleted}</div></div> : <div>Unscheduled</div>}
                </div>
                <br />
                <div className="serviceEmployees">
                    <h5>Employees</h5>

                    <div className="checkList">

                        <div className="list-container">
                            {users.map((user, index) => (
                                <div key={index}>
                                    {/* map throguh users then look to see which userJobInstances have userid. Then it defaults those as checked */}

                                    {userJobInstances.some(uj => uj.userId === user.id) ?
                                        <><input type="checkbox" value={userJobInstances.id} defaultChecked="checked" onChange={handleRemoveSchedule}/>
                                            <span>{user.fullName}</span>
                                        </>
                                        
                                        :
                                        <>
                                            <input type="checkbox" value={user.id} onChange={handleAddSchedule}/>
                                            <span>{user.fullName}</span>
                                        </>
                                    }
                                    



                                </div>
                            ))}
                        </div>
                    </div>

                </div>


            </div>
        </>
    );
};
