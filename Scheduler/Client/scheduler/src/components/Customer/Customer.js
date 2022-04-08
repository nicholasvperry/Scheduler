import React, { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import { Button } from "reactstrap";
import { CustomerContext } from "../../Providers/CustomerProvider";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Customer = ({ customerObject, reloadProp }) => {
    const navigate = useNavigate()
    // const {  } = useContext(CustomerContext)
    const user = JSON.parse(sessionStorage.getItem("userProfile"))
    // const [reloadState, setState] = useState();

    const handleClickDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // deletePost(post.id).then(reloadProp)
                Swal.fire(
                    'Deleted!',
                    'Post has been deleted.',
                    'success'
                )
            }
        })

    }

    const handleClickRow = () => {
        navigate(`/customer/${customerObject.id}`)
    }

    return (
        <>
        <tr 
        key={customerObject.id} 
        onClick={() => handleClickRow()}
        className="customerRow tableRow"
        >
              <td>
                
              </td>
              <td>
                <PersonSearchIcon /> {customerObject.fullName}
              </td>
              <td>
                {customerObject.email}
              </td>
              <td>
                {customerObject.phoneNumber}
              </td>
            </tr>
        </>
    );
};

export default Customer;