import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context';
import service from '../../services/config';
import { useNavigate } from 'react-router-dom';

export default function Management() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const { authenticateUser } = useContext(AuthContext);

  const handleButtonClickR = () => {
    navigate('/admin/reservation-list');
  };

  const handleButtonClickP = () => {
    navigate('/admin/product-list');
  };

  const handleButtonClickA = () => {
    navigate('/admin/area-list');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/auth/verify");
      console.log(response.data.payload.username)
      setUsername(response.data.payload.username);
      await authenticateUser();
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div>
      <p>Welcome {username}!</p>
      <h1>Home</h1>
      <div>
      <button onClick={handleButtonClickR}>Reservations</button>
      <br />
      <br />
      <button onClick={handleButtonClickP}>Available Products</button>
      <br />
      <br />
      <button onClick={handleButtonClickA}>Available Areas</button>
      </div>
    </div>
  );
}