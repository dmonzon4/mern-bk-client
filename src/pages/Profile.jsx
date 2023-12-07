import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import service from '../services/config';

export default function Profile() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, sePhoneNumber] = useState(''); 
  const { authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

    const getData = async () => {
      try {
        const response = await service.get("/auth/verify");
        console.log(response.data.payload.username)
        setUsername(response.data.payload.username);
        setEmail(response.data.payload.email);
        sePhoneNumber(response.data.payload.phoneNumber);
        await authenticateUser();
      } catch (error) {
        console.log(error);
      }
    };

  const handleButtonClick = () => {
    navigate('/');
  };



  return (
    <div className="form-container">
      <h3>Profile data:</h3>
      <form className="reservation-form">

        <div className="form-group">
          <label >Name:</label>
          <input type="name" id="name" value={username} readOnly />
        </div>

        <div className="form-group">
          <label >Email:</label>
          <input type="name" id="email" value={email} readOnly />
        </div>

        <div className="form-group">
          <label >Phone Number:</label>
          <input type="name" id="telNum" value={phoneNumber} readOnly />
        </div>

      </form>
      <br />
      <div>
        <Link to="/reservation">Reservations</Link>
        <br />
        <br />
        <button onClick={handleButtonClick}>Home</button>
      </div>
    </div>
  );
}
