import React, { useState, useEffect, createContext } from "react";


export const UserJobInstanceContext = createContext();

export function UserJobInstanceProvider(props) {
  //user state holds list of users from API
  const [userJobInstances, setUserJobInstances] = useState([])
  const apiUrl = "https://localhost:44320";

  const getAllUserJobInstances = () => {
    return fetch(`${apiUrl}/api/userjobInstance`)
      .then((res) => res.json())
      .then(setUserJobInstances)
  }

  const getInstancesByJobId = (id) => {
    return fetch(`${apiUrl}/api/userjobInstance/${id}`)
      .then((res) => res.json())
  }

  const getUserInstancesByJobInstanceId = (id) => {
    return fetch(`${apiUrl}/api/userjobInstance/getbyjobinstance/${id}`)
      .then((res) => res.json())
  }
  
  const updateUserInstance = instance => {
    return fetch(`${apiUrl}api/UserJobInstance/${instance.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(instance)
    })
  }
  const addUserInstance = (instance) => {
    return fetch(`${apiUrl}/api/UserJobInstance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(instance),
  })
}

  return (
    <UserJobInstanceContext.Provider value={{ getAllUserJobInstances, userJobInstances, getInstancesByJobId, updateUserInstance, addUserInstance, getUserInstancesByJobInstanceId }}>
      {props.children}
    </UserJobInstanceContext.Provider>
  );
}