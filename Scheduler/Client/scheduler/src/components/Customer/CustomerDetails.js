import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { CustomerContext } from "../../Providers/CustomerProvider";
import { CustomerLocation } from "./CustomerLocation";
import Button from 'react-bootstrap/Button';
import { CustomerBackdrop } from "./CustomerModalBackdrop";
import { motion, AnimatePresence } from "framer-motion";
import { LocationForm } from "../Location/LocationForm";


export const CustomerDetails = () => {
    const { getCustomerByIdWithJobInformation, updateCustomer } = useContext(CustomerContext);
    const { id } = useParams();
    const [customer, setCustomer] = useState()
    const navigate = useNavigate();
    //added this just to be able to update state
    //Added swalProps to useEffect and setSwalProps to add comment
    //When addComment set swalProps useEffect updates stat and refreshes comments
    const [refreshProps, setRefreshProps] = useState()

    //add state for locationForm modal
    const [locationFormModalOpen, setLocationFormModal] = useState(false)
    const locationClose = () => setLocationFormModal(false)
    const locationOpen = () => setLocationFormModal(true)

    useEffect(() => {
        getCustomerByIdWithJobInformation(id)
            .then(setCustomer)

    }, [refreshProps]);

    //this needed to be added because when page loads there is no customer
    if (!customer) {
        return null;
    }


    return (
        <>
            <div className="customerDetailCard">
                <div className="customerName">
                    <h1>{customer.fullName}</h1>
                </div>
                <Button
                    className="customerDetailsButton backButton"
                    variant="secondary"
                    onClick={() => navigate(`/customers`)}
                >Back To Customers</Button>
                <br />

                <h2>Locations</h2>
                <Button
                    className="addLocationButton"
                    variant="secondary"
                    onClick={() => (locationFormModalOpen ? locationClose() : locationOpen())}
                >
                    Add Location
                </Button>

                <div className="customerLocations">{customer.customerLocations.map((customer) => (
                    <CustomerLocation customerName={customer.fullName} locationObject={customer} key={customer.name} />
                ))}</div>


                <AnimatePresence
                    //Disable and initial animations on children that are present when the compent is first rendered
                    initial={false}
                    //Only render one component at a time.
                    //The exiting componenet will finish its exit animation before entering component is rendered
                    exitBeforeEnter={true}
                //Fires whel all exiting nodes have completed animating out

                >
                    {locationFormModalOpen && <LocationForm locationFormModalOpen={locationFormModalOpen} handleClose={locationClose} />}

                </AnimatePresence>

            </div>
        </>
    );
};
