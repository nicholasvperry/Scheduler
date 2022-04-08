import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Hello from "./Hello";
import { UserContext } from "../Providers/UserProvider";
import CustomerList from "./Customer/CustomerList";
import { CustomerDetails } from "./Customer/CustomerDetails";
import { JobDetails } from "./Job/JobDetail";


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserContext);


  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  else {
    return (
      <Routes>
        <Route path="/*" element={<Hello />} />
        
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />

        <Route path="/job/:id" element={<JobDetails />} />
        
      </Routes>
    );
  }
}
