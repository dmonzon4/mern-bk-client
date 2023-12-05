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
    <div>
      <h3>Profile data:</h3>
      <form>

        <div className="mb-3">
          <label >Name:</label>
          <input type="text" id="name" value={username} readOnly />
        </div>

        <div className="mb-3">
          <label >Email:</label>
          <input type="text" id="email" value={email} readOnly />
        </div>

        {/* <div className="mb-3">
          <label >Phone Number:</label>
          <input type="text" id="telNum" value={phoneNumber} readOnly />
        </div> */}

      </form>
      <div>
        <Link to="/reservation">Reservations</Link>
        <br />
        <button onClick={handleButtonClick}>Home</button>
      </div>
    </div>
  );
}
