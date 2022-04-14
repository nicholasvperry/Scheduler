import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Hello from "./Hello";
import { UserContext } from "../Providers/UserProvider";
import CustomerList from "./Customer/CustomerList";
import { CustomerDetails } from "./Customer/CustomerDetails";
import { JobDetails } from "./Job/JobDetail";
import { JobInstanceDetails } from "./JobInstance/JobInstanceDetails";
import { InstanceForm } from "./JobInstance/JobInstanceForm";
import { ScheduleList } from "./Schedule/ScheduleList";


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

        <Route path="/addservice/:id" element={<InstanceForm />} />
        <Route path="/jobinstance/:id" element={<JobInstanceDetails />} />


        <Route path="/schedule/:id" element={<ScheduleList />} />
        
      </Routes>
    );
  }
}
