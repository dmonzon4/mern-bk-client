import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Reservation() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/reservation-management');
  };

  return (
    <div>
    <h1>Reservations</h1>
    {/* <img reserva 1> */}
    <div>
        <Link to="/reservation">Reservas</Link>
        <br />
        <button onClick={handleButtonClick}>Reservation Management</button>
        <br />
        <br />
        <button onClick={handleButtonClick}>Cancel</button>
      </div>
    </div>
  )
}
