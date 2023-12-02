import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };



  return (
    <div>
      <h3>Profile data:</h3>
      <form>

        <div className="mb-3">
          <label >Name:</label>
          <input type="text" id="name" value={""} readOnly />
        </div>

        <div className="mb-3">
          <label >Email:</label>
          <input type="text" id="email" value={""} readOnly />
        </div>

        <div className="mb-3">
          <label >Phone Number:</label>
          <input type="text" id="telNum" value={""} readOnly />
        </div>

      </form>
      <div>
        <Link to="/reservation">Reservations</Link>
        <br />
        <button onClick={handleButtonClick}>Home</button>
      </div>
    </div>
  );
}
