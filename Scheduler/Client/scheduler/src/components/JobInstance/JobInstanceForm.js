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
import { JobModalBackdrop } from "../Job/JobModalBackdrop";
import { motion } from "framer-motion";
import { JobInstanceModalBackdrop } from "./JobInstanceModalBackdrop";
import Button from 'react-bootstrap/Button';


//make sure to wrap handleClose {}
export const InstanceForm = ({ handleClose, jobId, refreshProps }) => {
    const { getJobById } = useContext(JobContext);
    const { getAllUsers, users } = useContext(UserContext)
    const { addInstance, getJobInstancesByJobId } = useContext(JobInstanceContext)
    const { addUserInstance } = useContext(UserJobInstanceContext)
    const [job, setJob] = useState()
    const navigate = useNavigate()
    // const { id } = useParams();
    const [instance, setInstance] = useState({
        scheduleDate: null
    })
    //state for checkboxes
    const [checked, setChecked] = useState([]);
    const [employeeChecked, setEmployeeChecked] = useState([]);
    const [recurring, setRecurring] = useState(true)

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
            y: "20%",
            opacity: 0,

        }
    }

    //for react-date-range
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);


    useEffect(() => {
        getJobById(jobId)
            .then(setJob)
    }, [ ]);

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


    //sets state for adding multiple days
    const toggleChange = () => {
        if (recurring === true) {
            setRecurring(false)
        }
        if (recurring === false) {
            setRecurring(true)
        }
    }

    //add the instance and then add the userjobinstances
    const addSingleInstance = () => {
        //add instance
        
        addInstance({
            jobId: jobId,
            completedDate: null,
            price: null,
            currentRouteOrder: job.routeOrderNumber,
            scheduleDate: instance.singleDate,
            isPaid: false,
            completedUserId: null
        }).then((instance) => {
            //instance is the response from the add instance call
            //map through the checkedemployees state and make an array with their id
            const employeeArray = [employeeChecked.map(e => {
                return new Promise(() => {
                    fetch(`https://localhost:44320/api/UserJobInstance`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            JobInstanceId: instance.id,
                            UserId: e,
                            TimeIn: null,
                            TimeOut: null
                        }),
                    })
                })
            })]
            Promise.all(employeeArray)
            .then(refreshProps)
        })
    }

    const addEmployeesToSchedule = () => {

        getJobInstancesByJobId(jobId).then((jobInstancesById) => {
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
                .then(refreshProps)
            })
        })
    }


    const findAllDays = (selectedDays) => {
        //calculates days between two dates
        var startDate = new Date(Moment(dates[0].startDate).format(`MM-DD-YYYY`))
        var endDate = new Date(Moment(dates[0].endDate).format(`MM-DD-YYYY`))
        var numberOfDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
        // alert(numberOfDays)

        //finds all days between dates. 0 = Sunday 1 = Monday
        var start = Moment(dates[0].startDate), // selected from calendar
            end = Moment(dates[0].endDate), // selected in calendar
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
                        jobId: jobId,
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
        //debugger
        Promise.all(resultsArray)
            .then(() => {
                addEmployeesToSchedule()
            })
    }



    const addMultipleInstances = () => {


        checked.forEach((c, i) => {
            findAllDays(c)
        })
    }

    return (
        <>
            <JobInstanceModalBackdrop onClick={handleClose}>
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="jobForm"
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >


                    <form className="addInstanceForm">
                        <h2 className="addInstanceFormTitle">New Service</h2>

                        <div>{job.name}</div>
                        <div>{job.details}</div>
                        <div>

                            <div>
                                <input value="recurringInput" onChange={toggleChange} type="checkbox" />
                                <span >Recurring</span>
                            </div>


                            {recurring === false ?
                                <div className="recurring">
                                    {/* <div className="often">
                                <h6>Frequency</h6>
                                <select onChange={handleControlledInputChange} name="frequency">
                                    <option>Choose Frequency</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="biWeekly">Bi Weekly</option>
                                </select>
                            </div> */}

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
                                    </div>
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

                                :
                                <div className="instanceName">
                                    <label htmlFor="addInstanceName">Date </label> <br/>
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
                            <Button 
                            variant="secondary"
                            className="btn btn-primary"
                                onClick={event => {
                                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                    addSingleInstance()
                                    handleClose()

                                }}
                            >
                                Add Service
                            </Button> :

                            <Button
                            variant="secondary"
                            className="btn btn-primary"
                                onClick={event => {
                                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                    addMultipleInstances()
                                    handleClose()
                                }}
                            >
                                Add Services
                            </Button>

                        }
                        &nbsp;
                        <Button 
                        variant="secondary"                        
                        className="btn btn-primary" onClick={(e) => {
                            e.preventDefault()
                            handleClose()
                        }}>Cancel</Button>
                    </form>
                    <div className="instanceFormBorder"></div>
                </motion.div>
            </JobInstanceModalBackdrop>
        </>
    )


}