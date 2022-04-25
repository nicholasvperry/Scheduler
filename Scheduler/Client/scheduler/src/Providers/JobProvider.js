import React, { useState, useEffect, createContext } from "react";


export const JobContext = createContext();

export function JobProvider(props) {
  //user state holds list of users from API
  const [jobs, setJobs] = useState([])
  const apiUrl = "https://localhost:44320";

  const getAllJobs = () => {
    return fetch(`${apiUrl}/api/job`)
      .then((res) => res.json())
      .then(setJobs)
  }

  const getJobById = (id) => {
    return fetch(`${apiUrl}/api/job/${id}`)
      .then((res) => res.json())
  }

  const addJob = (job) => {
    return fetch(`${apiUrl}/api/Job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  }).then((res) => res.json())
}
  

  return (
    <JobContext.Provider value={{ getAllJobs, jobs, getJobById, addJob }}>
      {props.children}
    </JobContext.Provider>
  );
}