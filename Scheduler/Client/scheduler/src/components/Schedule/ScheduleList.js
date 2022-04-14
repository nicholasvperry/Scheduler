import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserJobInstanceContext } from "../../Providers/UserJobInstanceProvider"
import { Schedule } from "./Schedule"
import { Calendar } from 'react-date-range';
import Moment from "moment";
import { Button, Collapse } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export const ScheduleList = () => {

    const { getInstancesByUserId, userJobInstances } = useContext(UserJobInstanceContext)
    const { id } = useParams()

    //state for collapsable item
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getInstancesByUserId(id)
    }, [])

    
    const [date, setDate] = useState(new Date());
    //make state for dnd list
    const [jobOrder, setJobOrder] = useState([])
    useEffect(() => {

        let selectedDate = Moment(date).format(`MM-DD-YYYY`)
        const filteredInstances = userJobInstances.filter(instances => Moment(instances.jobInstance.scheduleDate).format(`MM-DD-YYYY`) === selectedDate)
        setJobOrder(filteredInstances)
    }, [userJobInstances, date])
    

    function handleOnDragEnd(result) {
        //if the item is outside of drop area it returns to original location
        if(!result.destination) return;
        //create new array from job order
        const items = Array.from(jobOrder)
        //find index number and remove from array
        const [reorderedItem] = items.splice(result.source.index, 1)
        //put item back into array with destination value
        items.splice(result.destination.index, 0, reorderedItem)
        //update jobOrder state
        setJobOrder(items)
    }
    
    debugger
    return (
        <>


            <div lang="eng" className="myOrders">
                <h3>Schedule</h3>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    {Moment(date).format(`MM-DD-YYYY`)}
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Calendar onChange={item => setDate(item)}
                            date={date}
                            />
                    </div>
                </Collapse>


                <div>
                    <br />
                    <br />
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="jonInstances">
                            {(provided) => (
                                <ul className="userJobInstances"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {jobOrder.map((instance, index) => (
                                        <Draggable
                                            key={instance.id}
                                            draggableId={instance.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li className="instanceCard"
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Schedule instanceObject={instance} />
                                                    <br/>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}


                        </Droppable>
                    </DragDropContext>
                </div>





            </div>

        </>
    )
}