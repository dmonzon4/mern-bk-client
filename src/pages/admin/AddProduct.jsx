import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      price,
      category,
      image,
    };

    try {
      const response = await service.post("/products", newProduct);
      console.log(response);
      navigate('/admin/product-list');

    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>New Product</h3>

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
        <label number="price">Price: </label>
        <input
          type="number"
          name="price"
          onChange={handlePriceChange}
          value={price}
        />
        <br />
        <br />
        <label htmlFor="category">Category: </label>
        <input
          type="text"
          name="category"
          onChange={handleCategoryChange}
          value={category}
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

export default AddProduct;
