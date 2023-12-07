import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../../services/config";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function AreaList() {
  const navigate = useNavigate();

  const [allAreas, setAllAreas] = useState(null); // => null?
  const [isLoading, setIsLoading] = useState(true); // 1. Loading...

  const handleButtonClick = () => {
    navigate("/admin/add-area");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/areas");
      console.log(response);
      setAllAreas(response.data);
      setIsLoading(false); // 2. Loading...
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading === true) {
    // 3. Loading...
    return (
      <div
        style={{ padding: "300px", display: "flex", justifyContent: "center" }}
      >
        <PropagateLoader color={"darkorange"} size={15} />
      </div>
    );
  }

  // const handleDelete = async (areaId) => {
  //   try {
  //     await axios.delete(`/areas/${areaId}`);
  //     const updatedAreas = allAreas.filter((area) => area._id !== areaId);
  //     setAllAreas(updatedAreas);
  //   } catch (error) {
  //     console.error('Error deleting area:', error);
  //   }
  // };

  return (
    <div>
      <h3>Available Areas</h3>
      <div>
        {allAreas.map((eachArea) => {
          return (
            <div key={eachArea._id}>
              <strong>{eachArea.name}</strong>
              <br />
              {eachArea.image && (
                <img
                  src={eachArea.image}
                  alt={eachArea.name}
                  style={{ maxWidth: "200px", maxHeight: "150px" }}
                />
              )}
              {/* <span><button onClick={() => handleDelete(eachArea._id)}>Delete</button></span> */}
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handleButtonClick}>Add new area</button>
      </div>
    </div>
  );
}
