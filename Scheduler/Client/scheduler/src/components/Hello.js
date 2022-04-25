import React from "react";
import CustomerList from "./Customer/CustomerList";
import logo from "../images/scheduler1.png"

export default function Hello() {
  const user = JSON.parse(sessionStorage.getItem("userProfile"))
  return (
    <>
    <h4 style={{
      textAlign: "center",
      //user.fullName is a cunstructor in csharp
    }}
    className="welcomeName"
    >Hello {user.fullName}</h4>
    
    <div className="welcomeContent">
    <h5 style={{
      textAlign: "center",
      //user.fullName is a cunstructor in csharp
    }}>WELCoME To</h5>
    <br/>
    <h1 className="welcomeHeader" style={{
      textAlign: "center",
      //user.fullName is a cunstructor in csharp
    }}>SCHEDuLER</h1>
    </div>
    </>
  );
}