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
  // const [errors, setErrors] = useState({});

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

    // // Validación de campos
    // const newErrors = {};
    // if (!name) {
    //   newErrors.name = "Name is required";
    // }
    // if (!price) {
    //   newErrors.price = "Price is required";
    // }
    // if (!category) {
    //   newErrors.category = "Category is required";
    // }
    // if (!image) {
    //   newErrors.image = "Image URL is required";
    // }

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    try {
      const response = await service.post("/products", newProduct);
      console.log(response);
      navigate('/admin/product-list');
      // setErrors({});

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
        {/* {errors.name && <p style={{ color: "red" }}>{errors.name}</p>} */}
        <br />
        <br />
        <label number="price">Price: </label>
        <input
          type="number"
          name="price"
          onChange={handlePriceChange}
          value={price}
        />
        {/* {errors.name && <p style={{ color: "red" }}>{errors.price}</p>} */}
        <br />
        <br />
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          onChange={handleCategoryChange}
          value={category}
        >
          <option value="">Select a category</option>
          <option value="food">Food</option>
          <option value="drink">Drink</option>
        </select>
        {/* {errors.name && <p style={{ color: "red" }}>{errors.category}</p>} */}
        <br />
        <br />
        <label htmlFor="image">Image: </label>
        <input
          type="text"
          name="image"
          onChange={handleImageChange}
          value={image}
        />
        {/* {errors.name && <p style={{ color: "red" }}>{errors.image}</p>} */}
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
