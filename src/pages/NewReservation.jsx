// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function NewReservation() {
//   return (
//     <div>
//       <h1>New Reservation</h1>

//       <form>

//         <div className="mb-3">
//           <label htmlFor="area">Area:</label>
//           <select id="area" value={"selectedArea"} onChange={"handleAreaChange"}>
//             <option value="">Selecciona un área</option>
//             {/* {areasList.map((area, index) => (
//               <option key={index} value={area}>
//                 {area}
//             </option>
//             ))} */}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label >Name:</label>
//           <input type="text" id="name" value={""} readOnly />
//         </div>
//         <div className="mb-3">
//           <label >Email:</label>
//           <input type="text" id="email" value={""} readOnly />
//         </div>
//         <div className="mb-3">
//           <label >Phone Number:</label>
//           <input type="text" id="telNum" value={""} readOnly />
//         </div>

        

//       </form>
//       <div>
//         <button onClick={"handleButtonClick"}>Reservar</button>
//       </div>
//     </div>
//   )
// }


import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config";

function ReservationForm(props) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [user, setUser] = useState("");
  const [reservedArea, setReservedArea] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("14:00"); // Default value
  const [numberOfPeople, setNumberOfPeople] = useState("");

  // Fetch users and areas data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await service.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await service.get("/areas");
        setAreas(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchAreas();
  }, []);

  const handleUserChange = (e) => setUser(e.target.value);
  const handleReservedAreaChange = (e) => setReservedArea(e.target.value);
  const handleReservationDateChange = (e) => setReservationDate(e.target.value);
  const handleReservationTimeChange = (e) => setReservationTime(e.target.value);
  const handleNumberOfPeopleChange = (e) => setNumberOfPeople(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReservation = {
      user,
      reservedArea,
      reservationDate,
      reservationTime,
      numberOfPeople,
    };

    try {
      const response = await service.post("/reservations", newReservation);
      console.log(response);
      props.getData();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Crear Reserva</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Usuario: </label>
        <select name="user" onChange={handleUserChange} value={user}>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} {/* Assuming 'username' exists in the user model */}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="reservedArea">Área reservada: </label>
        <select
          name="reservedArea"
          onChange={handleReservedAreaChange}
          value={reservedArea}
        >
          {areas.map((area) => (
            <option key={area._id} value={area._id}>
              {area.name} {/* Assuming 'name' exists in the area model */}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="reservationDate">Fecha de reserva: </label>
        <input
          type="date"
          name="reservationDate"
          onChange={handleReservationDateChange}
          value={reservationDate}
        />
        <br />

        <label htmlFor="reservationTime">Hora de reserva: </label>
        <select
          name="reservationTime"
          onChange={handleReservationTimeChange}
          value={reservationTime}
        >
          {/* Options for reservation time */}
          {Array.from(Array(9).keys()).map((hour) => {
            const time = `${hour + 14}:00`; // Starting from 14:00
            return (
              <option key={time} value={time}>
                {time}
              </option>
            );
          })}
        </select>
        <br />

        <label htmlFor="numberOfPeople">Número de personas: </label>
        <input
          type="number"
          name="numberOfPeople"
          onChange={handleNumberOfPeopleChange}
          value={numberOfPeople}
        />
        <br />

        <button type="submit">Crear Reserva</button>
      </form>
    </div>
  );
}

export default ReservationForm;
