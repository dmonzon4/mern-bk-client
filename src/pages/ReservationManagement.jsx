import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import service from '../services/config';
import { AuthContext } from '../context/auth.context';

export default function ReservationManagement() {
  const [reservationDetails, setReservationDetails] = useState({});
  const { userData } = useContext(AuthContext);
  const { reservationId } = useParams();

  useEffect(() => {
    if (userData && reservationId) {
      getReservationDetails(userData._id, reservationId);
    }
  }, [userData, reservationId]);

  const getReservationDetails = async (userId, resId) => {
    try {
      const response = await service.get(`/reservations/user/${userId}/${resId}`);
      setReservationDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReservation = async () => {
    // Lógica para actualizar la reserva
    try {
      await service.put(`/reservations/${reservationId}`, reservationDetails);
      // Redirigir a la página de reservaciones después de actualizar
      // navigate('/reservation');
    } catch (error) {
      console.log(error);
    }
  };

  // Renderizar detalles de la reserva y formulario para actualizar
  return (
    <div>
      {/* Mostrar detalles de la reserva y formulario para editar */}
      {/* Implementar formulario con campos para editar */}
      <button onClick={handleUpdateReservation}>Update</button>
    </div>
  );
}

