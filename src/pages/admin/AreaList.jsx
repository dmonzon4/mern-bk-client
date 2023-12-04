import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AreaList() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/admin/add-area');
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Available Areas</button>
    </div>
  )
}
