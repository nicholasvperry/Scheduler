import React, { useState, useEffect, createContext } from "react";


export const UserContext = createContext();

export function UserProvider(props) {
  //user state holds list of users from API
  const [users, setUsers] = useState([])
  const [userTypes, setUserTypes] = useState([])
  const apiUrl = "https://localhost:44320";
  const [admins, setAdmins] = useState([])
  const user = sessionStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(user != null);


  const login = (userObject) => {
    return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          setIsLoggedIn(true);
          return userProfile
        }
        else{
          return undefined
        }
      });
  };

  const logout = () => {
    sessionStorage.clear()
    setIsLoggedIn(false);
  };

  const register = (userObject, password) => {
    return fetch(`${apiUrl}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
      .then((response) => response.json())
      .then((savedUser) => {
        sessionStorage.setItem("user", JSON.stringify(savedUser))
        setIsLoggedIn(true);
      });
  };

  const getAllUsers = () => {
    return fetch(`${apiUrl}/api/user`)
      .then((res) => res.json())
      .then(setUsers)
  }

  const getAdmins = () => {
    return fetch(`${apiUrl}/api/user/getadmins`)
      .then((res) => res.json())
      .then(setAdmins)
  }

  const getUserTypes = () => {
    return fetch(`${apiUrl}/api/user/usertypes`)
      .then((res) => res.json())
      .then(setUserTypes);
  }

  const getById = (id) => {
    return fetch(`${apiUrl}/api/user/${id}`)
      .then((res) => res.json())
  }

  const deactivateUser = (id) => {
    return fetch(`${apiUrl}/api/user/deactivate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(getAllUsers)
  }

  const reactivateUser = (id) => {
    return fetch(`${apiUrl}/api/user/reactivate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(getAllUsers)
  }

  const updateUser = user => {
    return fetch(`https://localhost:44360/api/User/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(getAllUsers)
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout, register, getAllUsers, setUsers, users, getById, deactivateUser, reactivateUser, updateUser, getUserTypes, userTypes, getAdmins, admins }}>
      {props.children}
    </UserContext.Provider>
  );
}