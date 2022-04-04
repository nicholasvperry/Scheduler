import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Hello from "./Hello";
import { UserContext } from "../Providers/UserProvider";


export default function ApplicationViews() {
  const { isLoggedIn, user } = useContext(UserContext);

  
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  } 
  else{
   return(
      <Routes>
        <Route path="/" element={<Hello />} />

        
      </Routes>
   );
  }
}
