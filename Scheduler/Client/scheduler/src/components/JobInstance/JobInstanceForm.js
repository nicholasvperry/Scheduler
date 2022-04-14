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
import { UserJobInstanceContext } from "../../Providers/UserJobInstanceProvider";

export const InstanceForm = () => {
    const { getJobById } = useContext(JobContext);
    const { getAllUsers, users } = useContext(UserContext)
    const { addInstance, getJobInstancesByJobId, jobInstancesById } = useContext(JobInstanceContext)
    const { addUserInstance } = useContext(UserJobInstanceContext)
    const [refreshProps, setRefreshProps] = useState()
    const [job, setJob] = useState()
    const navigate = useNavigate()
    const { id } = useParams();
    const [instance, setInstance] = useState()
    //state for checkboxes
    const [checked, setChecked] = useState([]);
    const [employeeChecked, setEmployeeChecked] = useState([]);
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

    const handleEmployeeCheck = (event) => {
        var updatedList = [...employeeChecked];
        if (event.target.checked) {
            updatedList = [...employeeChecked, event.target.value];
        } else {
            updatedList.splice(employeeChecked.indexOf(event.target.value), 1);
        }
        setEmployeeChecked(updatedList);
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

    const addEmployeesToSchedule = () => {

        getJobInstancesByJobId(id).then(() => {
            jobInstancesById.forEach((j) => {
                
                const employeesArray = [employeeChecked.map(employee => {
                    return new Promise(() => {

                        fetch(`https://localhost:44320/api/UserJobInstance`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                JobInstanceId: j.id,
                                UserId: employee,
                                TimeIn: null,
                                TimeOut: null
                            }),
                        })
                    })
                })]
                Promise.all(employeesArray)
            })
        })
    }


    const findAllDays = (selectedDays) => {
        //calculates days between two dates
        var startDate = new Date(Moment(dates[0].startDate).format(`MM-DD-YYYY`))
        var endDate = new Date(Moment(dates[0].endDate).format(`MM-DD-YYYY`))
        var numberOfDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
        // alert(numberOfDays)
        debugger
        //finds all days between dates. 0 = Sunday 1 = Monday
        var start = Moment(dates[0].startDate), // Sept. 1st
            end = Moment(dates[0].endDate), // Nov. 2nd
            day = parseInt(selectedDays); //this is the value coming from state

        var result = [];
        var current = start.clone();

        while (current.day(7 + day).isSameOrBefore(end)) {
            result.push(current.clone());
        }

        console.log(result.map(m => m.format('LLLL')));

        //format the date for c#
        const formattedResults = result.map(m => m.format('YYYY-MM-DD'))
        // debugger

        //make an array of fetch calls for the promise.all
        //map through dates selected in browser
        const resultsArray = [formattedResults.map(date => {
            //make promise for each date
            return new Promise(() => {
                fetch(`https://localhost:44320/api/JobInstance`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jobId: id,
                        completedDate: null,
                        price: null,
                        currentRouteOrder: job.routeOrderNumber,
                        scheduleDate: date,
                        isPaid: false,
                        completedUserId: null
                    }),
                })
            })
        })]
        //run promise.all with array of fetch calls created
        //get by id then loop through and add employees to each instance
        Promise.all(resultsArray)
            .then(() => {
                addEmployeesToSchedule()
            })
        // .then(() => {
        //     return fetch(`https://localhost:44320/api/jobInstance/${id}`)
        // }).then((response) => {
        //     debugger
        //     return response.json()
        // }).then((data) => {
        //     debugger
        //     data.map(instance => {

        //     })


        // })
    }



    const addMultipleInstances = () => {


        checked.forEach((c, i) => {
            findAllDays(c)
        })
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
                                <input value={1} onChange={handleCheck} type="checkbox" />
                                <span>Monday</span><br />
                                <input value={2} onChange={handleCheck} type="checkbox" />
                                <span>Tuesday</span><br />
                                <input value={3} onChange={handleCheck} type="checkbox" />
                                <span>Wednesday</span><br />
                                <input value={4} onChange={handleCheck} type="checkbox" />
                                <span>Thursday</span><br />
                                <input value={5} onChange={handleCheck} type="checkbox" />
                                <span>Friday</span><br />
                                <input value={6} onChange={handleCheck} type="checkbox" />
                                <span>Saturday</span><br />
                                <input value={0} onChange={handleCheck} type="checkbox" />
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
                                    <input value={user.id} type="checkbox" onChange={handleEmployeeCheck} />
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