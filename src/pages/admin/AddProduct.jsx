import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import PropagateLoader from "react-spinners/PropagateLoader";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  // const [isLoading, setIsLoading] = useState(true); // 1. Loading...
  // const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // const [errors, setErrors] = useState({});

  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  // below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await service.post(
        "/upload",
        uploadData
      );
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const newProduct = {
      name,
      price,
      category,
      image: imageUrl,
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
      // setIsLoading(false); // 2. Loading...
      // setErrors({});

    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  // if (isLoading === true) { // 3. Loading...
  //   return (
  //     <div
  //       style={{ padding: "300px", display: "flex", justifyContent: "center" }}
  //     >
  //       <PropagateLoader color={"darkorange"} size={15} />
  //     </div>
  //   );
  // }

  return (
    <div className="form-container">
      <h3>New Product</h3>

      <form onSubmit={handleSubmit} className="reservation-form">
        <label htmlFor="name">Name: </label>
        <input
          type="name"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        {/* {errors.name && <p style={{ color: "red" }}>{errors.name}</p>} */}
        <br />
        <br />
        <label number="price">Price: </label>
        <input
          type="name"
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
        <div>
          <label>Image: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        {isUploading ? <h3>... uploading image</h3> : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <br />
        <button disabled={isUploading}>Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
