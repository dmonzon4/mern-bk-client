import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";

function AddArea() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArea = {
      name,
      image,
    };

    try {
      const response = await service.post("/areas", newArea);
      console.log(response);
      navigate('/admin/area-list');
      // props.getData();

    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };


  return (
    <div>
      <h3>New Area</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <br />
        <br />
        <label htmlFor="image">Image: </label>
        <input
          type="text"
          name="image"
          onChange={handleImageChange}
          value={image}
        />
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddArea;
