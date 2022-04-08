import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "reactstrap";
import { CustomerContext } from "../../Providers/CustomerProvider";
import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';

export const LocationDetails = ({ locationObject, customerName }) => {

    return (
        <>
            <div className="locationCard">
                <h3></h3>
                <div></div>
                <div></div>
                <div></div>

            </div>
        </>
    )
}