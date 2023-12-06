// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import service from '../../services/config';
// import { AuthContext } from '../../context/auth.context';

// export default function ReservationList() {
//   const navigate = useNavigate();
//   const [userReservations, setUserReservations] = useState([]);
//   const { userData } = useContext(AuthContext);
//   const [username, setUsername] = useState('');
//   const { authenticateUser } = useContext(AuthContext);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async (userId) => {
//     try {
      
//       const response = await service.get('http://localhost:5005/api/reservations/'); // Cambiar 
//       setUserReservations(response.data);
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   useEffect(() => {
//     getDataN();
//   }, []);

//     const getDataN = async () => {
//       try {
//         const response = await service.get("/auth/verify");
//         console.log(response.data.payload.username)
//         setUsername(response.data.payload.username);
//         await authenticateUser();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//   const handleReservationManagement = () => {
//     navigate('/reservation-management');
//   };

//   const handleCancelReservation = () => {
//     // Lógica para cancelar la reserva
//   };

//   return (
//     <div>
//       <h1>Reservations</h1>
//       {/* <h3>Username: {username} </h3> */}
//       <div>
//         {userReservations.map((eachReservation) => (
//           <div key={eachReservation._id}>
//             <h4>Reservation Details</h4>
//             <p>Name: {eachReservation.user}</p>
//             <p>Reserved Area: {eachReservation.reservedArea}</p>
//             <p>Reservation Date: {eachReservation.reservationDate}</p>
//             <p>Reservation Time: {eachReservation.reservationTime}</p>
//             <p>Number of People: {eachReservation.numberOfPeople}</p>
//             <button onClick={handleCancelReservation}>Cancel</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import service from '../../services/config';
import { AuthContext } from '../../context/auth.context';

export default function Reservation() {
  const navigate = useNavigate();
  const [userReservations, setUserReservations] = useState([]);
  const { userData } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const { authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (userId) => {
    try {
      
      const response = await service.get('/reservations/');
      setUserReservations(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getDataN();
  }, []);

    const getDataN = async () => {
      try {
        const response = await service.get("/auth/verify");
        console.log(response.data.payload.username)
        setUsername(response.data.payload.username);
        await authenticateUser();
      } catch (error) {
        console.log(error);
      }
    };

  // const handleReservationManagement = () => {
  //   navigate(`/reservation/${eachReservation._id}/reservation-management`);
  // };

  // const handleCancelReservation = () => {
  //   // Lógica para cancelar la reserva
  // };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1>Reservations</h1>
      {/* <h3>Username: {username} </h3> */}
      <div>
        {userReservations.map((eachReservation) => (
          <div key={eachReservation._id}>
            <h4>Reservation Details</h4>
            {/* <p>Reserved Area: {eachReservation.reservedArea}</p> */}
            <h3>Reservation Date: {formatDate(eachReservation.reservationDate)}</h3>
            <p>Reservation Time: {eachReservation.reservationTime}</p>
            {/* <p>Number of People: {eachReservation.numberOfPeople}</p> */}
            <Link to={`/reservation/${eachReservation._id}/reservation-management-admin`}>Details</Link>
            {/* <button onClick={handleCancelReservation}>Cancel</button> */}
          </div>
        ))}
      </div>
    </div>
  );
}