import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { CustomerContext } from "../../Providers/CustomerProvider";
import { CustomerLocation } from "./CustomerLocation";


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

    //add refr
    useEffect(() => {
        getCustomerByIdWithJobInformation(id)
            .then(setCustomer)

    }, [refreshProps]);

    //this needed to be added because when page loads there is no customer
    if (!customer) {
        return null;
    }

    // let formattedDate = date.toLocaleDateString('en-US')

    // const handleCommentModal = () => {
    //     Swal.fire({
    //         title: 'Comment',
    //         html: `<input type="text" id="subject" class="swal2-input" placeholder="Subject">
    //         <textarea cols="30" rows="5" id="content" class="swal2-input" placeholder="Content">`,
    //         confirmButtonText: 'Save',
    //         focusConfirm: false,
    //         showCancelButton: true,
    //         preConfirm: () => {
    //             const subject = Swal.getPopup().querySelector('#subject').value
    //             const content = Swal.getPopup().querySelector('#content').value
    //             if (!subject || !content) {
    //                 Swal.showValidationMessage(`Please enter subject and content`)
    //             }
    //             return { subject: subject, content: content }
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             addComment({
    //                 postId: id,
    //                 userProfileId: user.id,
    //                 subject: result.value.subject,
    //                 content: result.value.content
    //             })
    //                 .then(setSwalProps) //setSwalProps just to update state to refresh comments

    //         }
    //     })


    // }





    return (
        <>
            <div className="customerDetailCard">
                <div className="customerName">
                    <h1>{customer.fullName}</h1>
                </div>
                <br />

                <h4>Locations</h4>
                <div className="customerLocations">{customer.customerLocations.map((customer) => (
                    <CustomerLocation customerName={customer.fullName} locationObject={customer} key={customer.name} />
                ))}</div>
            </div>
        </>
    );
};
