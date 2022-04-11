import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2';
import { JobInstanceContext } from "../../Providers/JobInstanceProvider";
import { JobContext } from "../../Providers/JobProvider";
import { UserContext } from "../../Providers/UserProvider";
import { Backdrop } from "./InstanceBackDrop";
import Moment from "moment";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import DateRangePicker from "react-date-range/dist/components/DateRangePicker";

export const InstanceForm = () => {
    const { getJobById } = useContext(JobContext);
    const { getAllUsers, users } = useContext(UserContext)
    const { addInstance } = useContext(JobInstanceContext)
    const [refreshProps, setRefreshProps] = useState()
    const [job, setJob] = useState()
    const navigate = useNavigate()
    const { id } = useParams();
    const [instance, setInstance] = useState()
    //state for checkboxes
    const [checked, setChecked] = useState([]);
    const [recurring, setRecurring] = useState(true)

    //for react-date-range
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        getJobById(id)
            .then(setJob)
    }, [refreshProps]);

    useEffect(() => {
        getAllUsers()
    }, [])

    //this needed to be added because when page loads there is no job
    if (!job) {
        return null;
    }


    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    //make a copy of state to manipulate for date and time
    const handleControlledInputChange = (event) => {
        //...product make a copy of current state
        const newInstance = { ...instance }

        //Change copy. name tells which property to change
        newInstance[event.target.name] = event.target.value

        //update corrent copy state
        setInstance(newInstance)

    }

    const toggleChange = () => {
        if (recurring === true) {
            setRecurring(false)
        }
        if (recurring === false) {
            setRecurring(true)
        }
    }


    const addSingleInstance = () => {
        debugger
        addInstance({
            jobId: id,
            completedDate: null,
            price: null,
            currentRouteOrder: job.routeOrderNumber,
            scheduleDate: instance.singleDate,
            isPaid: false,
            completedUserId: null
        }).then(() => navigate(`/job/${id}`))
    }

    const addMultipleInstances = () => {
        var startDate = new Date(Moment(dates[0].startDate).format(`MM-DD-YYYY`))
        var endDate = new Date(Moment(dates[0].endDate).format(`MM-DD-YYYY`))
        var numberOfDays = (endDate.getTime() - startDate.getTime())/(24 * 60 * 60 * 1000)
        alert(numberOfDays)

    }

    return (
        <>

            <form className="addInstanceForm">
                <h2 className="addInstanceFormTitle">New Service</h2>

                <div>{job.name}</div>
                <div>{job.details}</div>
                <div>

                    <div>
                        <input value="recurring" onChange={toggleChange} type="checkbox" />
                        <span>Recurring</span>
                    </div>


                    {recurring === false ?
                        <div className="recurring">
                            <div className="often">
                                <h6>Frequency</h6>
                                <select onChange={handleControlledInputChange} name="frequency">
                                    <option>Choose Frequency</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="biWeekly">Bi Weekly</option>
                                </select>
                            </div>

                            <div className="days">
                                <input value="monday" onChange={handleCheck} type="checkbox" />
                                <span>Monday</span><br />
                                <input value="tuesday" onChange={handleCheck} type="checkbox" />
                                <span>Tuesday</span><br />
                                <input value="wednesday" onChange={handleCheck} type="checkbox" />
                                <span>Wednesday</span><br />
                                <input value="thursday" onChange={handleCheck} type="checkbox" />
                                <span>Thursday</span><br />
                                <input value="friday" onChange={handleCheck} type="checkbox" />
                                <span>Friday</span><br />
                                <input value="saturday" onChange={handleCheck} type="checkbox" />
                                <span>Saturday</span><br />
                                <input value="sunday" onChange={handleCheck} type="checkbox" />
                                <span>Sunday</span>

                                <div className="duration">
                                    {/* <h6>From:</h6>
                                    <input type="date" id="startDate" name="startDate" required onChange={handleControlledInputChange}></input>
                                    <h6>To:</h6>
                                    <input type="date" id="endDate" name="endDate" required onChange={handleControlledInputChange}></input> */}
                                
                                    <DateRangePicker
                                        editableDateInputs={true}
                                        onChange={item => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        
                                        
                                    />
                                </div>

                            </div>
                        </div>

                        :
                        <div className="instanceName">
                            <label htmlFor="addInstanceName">Date </label>
                            <input type="date" id="addInstanceName" name="singleDate" onChange={handleControlledInputChange}
                            />
                        </div>}


                    <div className="checkList">
                        <div className="title">Employees:</div>
                        <div className="list-container">
                            {users.map((user, index) => (
                                <div key={index}>
                                    <input value={user.id} type="checkbox" onChange={handleCheck} />
                                    <span>{user.fullName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {recurring ?
                    <button className="btn btn-primary"
                        onClick={event => {
                            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                            addSingleInstance()

                        }}
                    >
                        Add Service
                    </button> :

                    <button className="btn btn-primary"
                        onClick={event => {
                            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                            addMultipleInstances()
                        }}
                    >
                        Add Services
                    </button>

                }

                <button className="btn btn-primary" onClick={() => {
                    navigate(`/job/${id}`)
                }}>Cancel</button>
            </form>

        </>
    )


}