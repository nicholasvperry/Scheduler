import React, { useState, useEffect, createContext } from "react";


export const CustomerContext = createContext();

export function CustomerProvider(props) {
  //user state holds list of users from API
  const [customers, setCustomers] = useState([])
  const apiUrl = "https://localhost:44320";

  const getAllCustomers = () => {
    return fetch(`${apiUrl}/api/customer`)
      .then((res) => res.json())
      .then(setCustomers)
  }

  const getCustomerByIdWithJobInformation = (id) => {
    return fetch(`${apiUrl}/api/customer/${id}`)
      .then((res) => res.json())
  }

  const GetCustomerByInstanceIdWithJobInformation = (id) => {
    return fetch(`${apiUrl}/api/customer/instance/${id}`)
      .then((res) => res.json())
  }

  const updateCustomer = customer => {
    return fetch(`https://localhost:44360/api/User/${customer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    }).then(getAllCustomers)
  }

  return (
    <CustomerContext.Provider value={{ getAllCustomers, getCustomerByIdWithJobInformation, updateCustomer, customers, setCustomers, GetCustomerByInstanceIdWithJobInformation }}>
      {props.children}
    </CustomerContext.Provider>
  );
}