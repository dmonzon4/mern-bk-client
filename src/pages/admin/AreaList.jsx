import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";

export default function AreaList() {

  const navigate = useNavigate();

  const [allAreas, setAllAreas] = useState(null); // => null?
  const [isLoading, setIsLoading] = useState(true); // 1. Loading...

  const handleButtonClick = () => {
    navigate('/admin/add-area');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/areas")
      console.log(response);
      setAllAreas(response.data);
      setIsLoading(false); // 2. Loading...
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };


  if (isLoading === true) { // 3. Loading...
    return (
      <div
        style={{ padding: "300px", display: "flex", justifyContent: "center" }}
      >
        <PropagateLoader color={"cornflowerblue"} size={20} />
      </div>
    );
  }

  return (
    <div>
      <h3>Available Areas</h3>
      <ul>
        {allAreas.map((eachArea) => {
          return (
            <li key={eachArea._id}>
              <strong>{eachArea.name}</strong>
              {eachArea.image && <img src={eachArea.image} alt={""} style={{ maxWidth: '200px', maxHeight: '150px' }} />}
            </li>
          );
        })}
      </ul>
      <button onClick={handleButtonClick}>Add new area</button>
    </div>
  );
}

