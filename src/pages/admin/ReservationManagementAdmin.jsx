// import React from 'react'

// export default function ReservationManagementAdmin() {
//   return (
//     <div>ReservationManagementAdmin</div>
//   )
// }


import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { AuthContext } from "../../context/auth.context";

export default function ReservationManagementAdmin() {
  // const [username, setUsername] = useState("");
  // const { authenticateUser } = useContext(AuthContext);

  const params = useParams()
  console.log(params)
  const navigate = useNavigate()

  const [ details, setDetails ] = useState(null)
  const [isLoading, setIsLoading] = useState(true); // 1. Loading...


  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {

    try {

      const response = await service.get(`/reservations/${params.reservationId}`)
  //     const response = await service.get(`/todo/${params.todoId}`)
      console.log(response.data)
      setDetails(response.data)
      setIsLoading(false); // 2. Loading...
      // setUsername(response.data.payload.username);
      // await authenticateUser();
    } catch (error) {
      console.log(error)
      navigate("/error")
        
    }

  }

  if (isLoading === true) { // 3. Loading...
    return (
      <div
        style={{ padding: "300px", display: "flex", justifyContent: "center" }}
      >
        <PropagateLoader color={"darkorange"} size={20} />
      </div>
    );
  }


  const handleCancelReservation = async () => {
    try {
      await service.delete(`/reservations/${params.reservationId}`);
      navigate("/reservation");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h2>Reservation details</h2>
      {/* <p>Welcome {username}!</p> */}
      {/* <h3>{details.data.payload.username}</h3> */}
      <h3>Name: {details.user.username}</h3>
      <h3>Area: {details.reservedArea.name}</h3>
      <h3>Reservation Date: {details.reservationDate}</h3>
      <h3>Reservation Time:{details.reservationTime}</h3>
      <h3>Number of people: {details.numberOfPeople}</h3>
      <button onClick={handleCancelReservation}>Cancel</button>      
    </div>
  );
}