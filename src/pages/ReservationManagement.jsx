// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import service from '../services/config';
// import { AuthContext } from '../context/auth.context';

// export default function ReservationManagement() {
//   const [reservationDetails, setReservationDetails] = useState({});
//   const { userData } = useContext(AuthContext);
//   const { reservationId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData && reservationId) {
//       getReservationDetails(userData._id, reservationId);
//     }
//   }, [userData, reservationId]);

//   const getReservationDetails = async (userId, resId) => {
//     try {
//       const response = await service.get(`/reservations/user/${userId}/${resId}`);
//       setReservationDetails(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReservationDetails({ ...reservationDetails, [name]: value });
//   };

//   const handleUpdateReservation = async () => {
//     try {
//       await service.put(`/reservations/${reservationId}`, reservationDetails);
//       navigate('/reservation');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Renderizar detalles de la reserva y formulario para actualizar
//   return (
//     <div>
//       <h2>Reservation Details</h2>
//       <p>Reserved Area: {reservationDetails.reservedArea}</p>
//       <p>Reservation Date: {reservationDetails.reservationDate}</p>
//       <p>Reservation Time: {reservationDetails.reservationTime}</p>
//       <p>Number of People: {reservationDetails.numberOfPeople}</p>

//       <h2>Update Reservation</h2>
//       <form onSubmit={handleUpdateReservation}>
//         <label htmlFor="reservedArea">Reserved Area:</label>
//         <input
//           type="text"
//           id="reservedArea"
//           name="reservedArea"
//           value={reservationDetails.reservedArea || ''}
//           onChange={handleInputChange}
//         />
//         <br />

//         <label htmlFor="reservationDate">Reservation Date:</label>
//         <input
//           type="date"
//           id="reservationDate"
//           name="reservationDate"
//           value={reservationDetails.reservationDate || ''}
//           onChange={handleInputChange}
//         />
//         <br />

//         <label htmlFor="reservationTime">Reservation Time:</label>
//         <input
//           type="time"
//           id="reservationTime"
//           name="reservationTime"
//           value={reservationDetails.reservationTime || ''}
//           onChange={handleInputChange}
//         />
//         <br />

//         <label htmlFor="numberOfPeople">Number of People:</label>
//         <input
//           type="number"
//           id="numberOfPeople"
//           name="numberOfPeople"
//           value={reservationDetails.numberOfPeople || ''}
//           onChange={handleInputChange}
//         />
//         <br />

//         <button type="submit">Update Reservation</button>
//       </form>
//     </div>
//   );
// }

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { AuthContext } from "../context/auth.context";

export default function ReservationManagement() {
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
        <PropagateLoader color={"darkcyan"} size={15} />
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Reservation details</h2>
      {/* <p>Welcome {username}!</p> */}
      {/* <h3>{details.data.payload.username}</h3> */}
      <h3>Name: {details.user.username}</h3>
      <h3>Area: {details.reservedArea.name}</h3>
      <h3>Reservation Date: {formatDate(details.reservationDate)}</h3>
      <h3>Reservation Time:{details.reservationTime}</h3>
      <h3>Number of people: {details.numberOfPeople}</h3>
      {/* <button onClick={handleCancelReservation}>Cancel</button>       */}
    </div>
  );
}