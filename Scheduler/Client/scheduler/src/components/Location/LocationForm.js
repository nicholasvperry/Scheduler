import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2';
import { CustomerBackdrop } from "../Customer/CustomerModalBackdrop";
import { motion } from "framer-motion";
import Button from 'react-bootstrap/Button';
import { LocationContext } from "../../Providers/LocationProvider";


//make sure to wrap handleClose {}
export const LocationForm = ({ handleClose, refreshProps, customerId }) => {

    const { addLocation } = useContext(LocationContext)

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
            y: "90%",
            opacity: 0,

        }
    }

    const [location, setLocation] = useState()
    //make a copy of state to manipulate
    const handleControlledInputChange = (event) => {
        //...product make a copy of current state
        const newLocation = { ...location }

        //Change copy. name tells which property to change
        newLocation[event.target.name] = event.target.value

        //update corrent copy state
        setLocation(newLocation)

    }

    const handleAddLocation = () => {
        alert(customerId)
        addLocation({
            name: location.name,
            customerId: customerId,
            streetAddress: location.streetAddress,
            city: location.city,
            state: location.state,
            zip: location.zip
        })
            .then(refreshProps)
    }

    return (

        <>
            <CustomerBackdrop onClick={handleClose}>
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="locationForm"
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >

                    <form className="locationFormBorder">
                        <h2>Location</h2>

                        <div>
                            <div className="locationName">
                                <label htmlFor="locationName">Name: </label>
                                <input type="text" id="locationName" name="name" required autoFocus
                                    placeholder="Name"
                                    onChange={handleControlledInputChange} />
                            </div>
                        </div>

                        <div>
                            <div className="streetAddress">
                                <label htmlFor="streetAddress">StreetAddress: </label>
                                <input type="text" id="streetAddress" name="streetAddress" required
                                    placeholder="Street Address"
                                    onChange={handleControlledInputChange} />
                            </div>
                        </div>

                        <div>
                            <div className="city">
                                <label htmlFor="city">City: </label>
                                <input type="text" id="city" name="city" required
                                    placeholder="City"
                                    onChange={handleControlledInputChange} />
                            </div>
                        </div>

                        <div>
                            <div className="state">
                                <label htmlFor="state">State: </label>
                                <select name="state" required onChange={handleControlledInputChange}>
                                    <option>Select State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="zip">
                                <label htmlFor="zip">ZIP Code: </label>
                                <input type="text" id="zip" name="zip" required
                                    placeholder="ZIP Code"
                                    onChange={handleControlledInputChange} />
                            </div>
                        </div>

                        <Button
                            variant="secondary"
                            onClick={e => {
                                e.preventDefault()
                                handleAddLocation()
                                handleClose()
                            }}>Add Location</Button>
                        &nbsp; &nbsp;
                        <Button
                            variant="secondary"
                            onClick={e => {
                                e.preventDefault()
                                handleClose()
                            }}>Cancel</Button>

                    </form>
                </motion.div>

            </CustomerBackdrop>
        </>
    )


}