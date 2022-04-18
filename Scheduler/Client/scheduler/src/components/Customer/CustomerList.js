import React, { useContext, useEffect, useState } from "react";
import { CardGroup, Row } from 'reactstrap';
import { CustomerContext } from "../../Providers/CustomerProvider";
import Customer from "./Customer.js";
import { CustomerSearch } from "./CustomerSearch";


const CustomerList = () => {
  //get context from Customerprovider
  const { customers, getAllCustomers, customerSearchTerms } = useContext(CustomerContext)

  //get all profiles
  useEffect(() => {
    getAllCustomers()
  }, [])

  // Since you are no longer ALWAYS displaying all of the customers
  const [filteredCustomers, setFiltered] = useState([])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change

  useEffect(() => {
    // debugger
    if (customerSearchTerms !== "") {
      // If the search field is not blank, display matching customers

      const subset = customers.filter(customer => customer.fullName.toLowerCase().includes(customerSearchTerms.toLowerCase()) || customer.email.toLowerCase().includes(customerSearchTerms.toLowerCase()))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all customers
      setFiltered(customers)
    }
  }, [customerSearchTerms, customers])

  if (!customers) {
    return null;
  }

  return (

    <>
      <div className="center">
        <div className="customerList" centered>
          <h1 className="customerHeader">Customers</h1>
          <CustomerSearch className="customerSearch" />
          <br /><br />
          <div className="customerTable">
            <table cellPadding={15} cellSpacing={0} className="customerTable">
              <thead className="tableHead">
                <tr >
                  <th className="icon"></th>
                  <th >
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
                {filteredCustomers.map((customer) => (
                  <Customer customerObject={customer} key={customer.id} />

                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>


  );
};

export default CustomerList;