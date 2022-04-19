import React, { useState, useEffect, createContext } from "react";


export const JobInstanceContext = createContext();

export function JobInstanceProvider(props) {
  //user state holds list of users from API
  const [jobInstances, setJobInstances] = useState([])
  const [jobInstancesById, setJobInstancesById] = useState([])
  const apiUrl = "https://localhost:44320";

  const getAllJobInstances = () => {
    return fetch(`${apiUrl}/api/jobInstance`)
      .then((res) => res.json())
      .then(setJobInstances)
  }

  const getJobInstancesByJobId = (id) => {
    return fetch(`${apiUrl}/api/jobInstance/${id}`)
      .then((res) => res.json())
  }

  const getJobDetailInstancesByJobId = (id) => {
    return fetch(`${apiUrl}/api/jobInstance/${id}`)
      .then((res) => res.json())
      .then(setJobInstancesById)
  }

  const updateInstance = instance => {
    return fetch(`https://localhost:44360/api/User/${instance.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(instance)
    })
  }
  const addInstance = (instance) => {
    return fetch(`${apiUrl}/api/JobInstance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instance),
    }).then((res) => res.json())
  }

  return (
    <JobInstanceContext.Provider value={{ getAllJobInstances, jobInstances, getJobInstancesByJobId, updateInstance, addInstance, jobInstancesById, getJobDetailInstancesByJobId }}>
      {props.children}
    </JobInstanceContext.Provider>
  );
}