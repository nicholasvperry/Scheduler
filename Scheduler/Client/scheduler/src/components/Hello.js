import React from "react";
import CustomerList from "./Customer/CustomerList";

export default function Hello() {
  const user = JSON.parse(sessionStorage.getItem("userProfile"))
  return (
    <>
    <h4 style={{
      textAlign: "center",
      //user.fullName is a cunstructor in csharp
    }}>Hello {user.fullName}</h4>
    
    </>
  );
}