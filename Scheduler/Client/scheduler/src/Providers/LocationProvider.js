import React, { useState, useEffect, createContext } from "react";


export const LocationContext = createContext();

export function LocationProvider(props) {
  //user state holds list of users from API
  const [location, setLocations] = useState([])
  const apiUrl = "https://localhost:44320";

  const addLocation = (location) => {
    return fetch(`${apiUrl}/api/CustomerLocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    }).then((res) => res.json())
  }



  return (
    <LocationContext.Provider value={{ addLocation }}>
      {props.children}
    </LocationContext.Provider>
  );
}