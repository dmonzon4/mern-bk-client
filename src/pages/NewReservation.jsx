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


// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import service from "../services/config";
// import { AuthContext } from "../context/auth.context";

// function ReservationForm(props) {
//   const navigate = useNavigate();

//   const { authenticateUser } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [areas, setAreas] = useState([]);
//   const [reservedArea, setReservedArea] = useState("");
//   const [reservationDate, setReservationDate] = useState("");
//   const [reservationTime, setReservationTime] = useState("14:00");
//   const [numberOfPeople, setNumberOfPeople] = useState("");

//   useEffect(() => {
//     fetchAreas();
//     getData();
//   }, []);

//   const fetchAreas = async () => {
//     try {
//       const response = await service.get("/areas");
//       setAreas(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getData = async () => {
//     try {
//       const response = await service.get("/auth/verify");
//       setUsername(response.data.payload.username);
//       await authenticateUser();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleReservedAreaChange = (e) => setReservedArea(e.target.value);
//   const handleReservationDateChange = (e) => setReservationDate(e.target.value);
//   const handleReservationTimeChange = (e) => setReservationTime(e.target.value);
//   const handleNumberOfPeopleChange = (e) => setNumberOfPeople(e.target.value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newReservation = {
//       user: username,
//       reservedArea,
//       reservationDate,
//       reservationTime,
//       numberOfPeople,
//     };

//     try {
//       const response = await service.post("/reservations", newReservation);
//       console.log(response);
//       props.getData();
//       // navigate('/admin/area-list');!!!!!!!!!!!!!!!!!!!!!!!1
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   return (
//     <div>
//       <h3>Crear Reserva</h3>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="user">Nombre del Usuario: </label>
//         <input type="text" value={username} readOnly />
//         <br />

//         <label htmlFor="reservedArea">Área reservada: </label>
//         <select
//           name="reservedArea"
//           onChange={handleReservedAreaChange}
//           value={reservedArea}
//         >
//           {areas.map((area) => (
//             <option key={area._id} value={area._id}>
//               {area.name}
//             </option>
//           ))}
//         </select>
//         <br />

//         <label htmlFor="reservationDate">Fecha de reserva: </label>
//         <input
//           type="date"
//           name="reservationDate"
//           onChange={handleReservationDateChange}
//           value={reservationDate}
//         />
//         <br />

//         <label htmlFor="reservationTime">Hora de reserva: </label>
//         <select
//           name="reservationTime"
//           onChange={handleReservationTimeChange}
//           value={reservationTime}
//         >
//           {Array.from(Array(9).keys()).map((hour) => {
//             const time = `${hour + 14}:00`;
//             return (
//               <option key={time} value={time}>
//                 {time}
//               </option>
//             );
//           })}
//         </select>
//         <br />

//         <label htmlFor="numberOfPeople">Número de personas: </label>
//         <input
//           type="number"
//           name="numberOfPeople"
//           onChange={handleNumberOfPeopleChange}
//           value={numberOfPeople}
//         />
//         <br />

//         <button type="submit">Crear Reserva</button>
//       </form>
//     </div>
//   );
// }

// export default ReservationForm;




import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config";
import { useNavigate } from "react-router-dom";

function ReservationForm() {
  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [areas, setAreas] = useState([]);
  const [reservedAreaId, setReservedAreaId] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("14:00");
  const [numberOfPeople, setNumberOfPeople] = useState("");

  useEffect(() => {
    fetchAreas();
    getData();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await service.get("/areas");
      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await service.get("/auth/verify");
      setUserId(response.data.payload._id);
      setUsername(response.data.payload.username);
      await authenticateUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservedAreaChange = (e) => {
    setReservedAreaId(e.target.value);
  };

  const handleReservationDateChange = (e) => {
    const selectedDate = e.target.value;
    setReservationDate(selectedDate);
  };

  const handleReservationTimeChange = (e) => {
    setReservationTime(e.target.value);
  };

  const handleNumberOfPeopleChange = (e) => {
    setNumberOfPeople(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReservation = {
      user: userId,
      reservedArea: reservedAreaId,
      // reservationDate: new Date(reservationDate).toLocaleDateString(),
      reservationDate,
      reservationTime,
      numberOfPeople,
    };

    try {
      const response = await service.post("/reservations", newReservation);
      console.log(response);
      navigate('/reservation');
      // props.getData();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Crear Reserva</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Nombre del Usuario: </label>
        <input type="text" value={username} readOnly />
        <br />

        <label htmlFor="reservedArea">Área reservada: </label>
        <select
          name="reservedArea"
          onChange={handleReservedAreaChange}
          value={reservedAreaId}
        >
          <option value="">Selecciona un área</option>
          {areas.map((area) => (
            <option key={area._id} value={area._id}>
              {area.name}
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
          {Array.from(Array(9).keys()).map((hour) => {
            const time = `${hour + 14}:00`;
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
