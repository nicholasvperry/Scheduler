import React, { useState, useEffect, createContext } from "react";


export const JobInstanceContext = createContext();

export function JobInstanceProvider(props) {
  //user state holds list of users from API
  const [jobInstances, setJobInstances] = useState([])
  const apiUrl = "https://localhost:44320";

  const getAllJobInstances = () => {
    return fetch(`${apiUrl}/api/jobInstance`)
      .then((res) => res.json())
      .then(setJobInstances)
  }

  const getInstancesByJobId = (id) => {
    return fetch(`${apiUrl}/api/jobInstance/${id}`)
      .then((res) => res.json())
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
  })
}

  return (
    <JobInstanceContext.Provider value={{ getAllJobInstances, jobInstances, getInstancesByJobId, updateInstance, addInstance }}>
      {props.children}
    </JobInstanceContext.Provider>
  );
}