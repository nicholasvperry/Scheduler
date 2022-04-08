import React, { useContext, useEffect, useState } from "react";
import { CardGroup, Row } from 'reactstrap';
import { CustomerContext } from "../../Providers/CustomerProvider";
import Customer from "./Customer.js";


const CustomerList = () => {
  //get context from Customerprovider
  const { customers, getAllCustomers } = useContext(CustomerContext)

  //get all profiles
  useEffect(() => {
    getAllCustomers()
  }, [])



  if (!customers) {
    return null;
  }


  return (

    <>
      <table cellPadding={15} cellSpacing={0} className="customerTable">
        <thead>
          <tr className="tableRow">
            <th className="icon"></th>
            <th>
              Name
            </th>
            <th>
              Email
            </th>
            <th>
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <Customer customerObject={customer} key={customer.id} />
            
          ))}

        </tbody>
      </table>

    </>


  );
};

export default CustomerList;