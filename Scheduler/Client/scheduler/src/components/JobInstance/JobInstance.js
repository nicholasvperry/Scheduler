import React, { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import { Button } from "reactstrap";
import { CustomerContext } from "../../Providers/CustomerProvider";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Moment from "moment";


const JobInstance = ({ jobObject, jobInstanceObject }) => {
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

    let scheduledDate = Moment(jobInstanceObject.scheduleDate).format(`MM-DD-YYYY, h:mm a`)
    let completedDate = Moment(jobInstanceObject.completedDate).format(`MM-DD-YYYY, h:mm a`)

    const handleClickRow = () => {
        navigate(`/jobInstance/${jobInstanceObject.id}`)
    }

    return (
        <>
        <tr 
        key={jobObject.id} 
        onClick={() => handleClickRow()}
        className="customerRow tableRow"
        >
              <td>
                
              </td>
              <td>
                <PersonSearchIcon /> {jobObject.name}
              </td>
              <td>
                {jobObject.details}
              </td>
              {jobInstanceObject.scheduleDate ? <td>
                {scheduledDate}
              </td> : ""}
              
              {jobInstanceObject.completedDate ? <td>
              {completedDate}
              </td> : ""}
              {jobInstanceObject.user.fullName ? <td>{jobInstanceObject.user.fullName}</td> : ""}
              
            </tr>
        </>
    );
};

export default JobInstance;