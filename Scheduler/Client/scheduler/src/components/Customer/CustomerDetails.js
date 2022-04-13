import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { CustomerContext } from "../../Providers/CustomerProvider";
import { CustomerLocation } from "./CustomerLocation";
import Button from 'react-bootstrap/Button';


export const CustomerDetails = () => {
    const { getCustomerByIdWithJobInformation, updateCustomer } = useContext(CustomerContext);
    const { id } = useParams();
    const [customer, setCustomer] = useState()
    const navigate = useNavigate();
    //added this just to be able to update state
    //Added swalProps to useEffect and setSwalProps to add comment
    //When addComment set swalProps useEffect updates stat and refreshes comments
    const [refreshProps, setRefreshProps] = useState()

    //get current user
    const user = JSON.parse(sessionStorage.getItem("userProfile"))

    
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

                <h4>Locations</h4>
                <div className="customerLocations">{customer.customerLocations.map((customer) => (
                    <CustomerLocation customerName={customer.fullName} locationObject={customer} key={customer.name} />
                ))}</div>
            </div>
        </>
    );
};
