// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Reservation() {
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     navigate('/reservation-management');
//   };

//   return (
//     <div>
//     <h1>Reservations</h1>
//     {/* <img reserva 1> */}
//     <div>
//         <Link to="/reservation">Reservas</Link>
//         <br />
//         <button onClick={handleButtonClick}>Reservation Management</button>
//         <br />
//         <br />
//         <button onClick={handleButtonClick}>Cancel</button>
//       </div>
//     </div>
//   )
// }


import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import service from '../services/config';
import { AuthContext } from '../context/auth.context';

export default function Reservation() {
  const navigate = useNavigate();
  const [userReservations, setUserReservations] = useState([]);
  const { userData } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async (userId) => {
    try {
      
      const response = await service.get('http://localhost:5005/api/reservations/'); // Cambiar 
      setUserReservations(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleReservationManagement = () => {
    navigate('/reservation-management');
  };

  const handleCancelReservation = () => {
    // Lógica para cancelar la reserva
  };

  return (
    <div>
      <h1>Reservations</h1>
      <p>Nombre del Usuario: <input type="text" value={username} readOnly /></p>
      <div>
        {userReservations.map((reservation) => (
          <div key={reservation._id}>
            <p>Reservation Details</p>
            {/* Mostrar el nombre del área en lugar del ID */}
            <p>Reserved Area: {reservation.reservedAreaName}</p>
            <p>Reservation Date: {reservation.reservationDate}</p>
            <p>Reservation Time: {reservation.reservationTime}</p>
            <p>Number of People: {reservation.numberOfPeople}</p>

            {/* Botones para gestionar y cancelar la reserva */}
            <button onClick={handleReservationManagement}>Reservation Management</button>
            <button onClick={handleCancelReservation}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
}
