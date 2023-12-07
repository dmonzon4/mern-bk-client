// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function EditProduct() {
//   const { productId } = useParams();
//   const [productData, setProductData] = useState({});
//   const [editedProduct, setEditedProduct] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5005/api/products/${productId}`
//         );
//         setProductData(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getProduct();
//   }, [productId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct({
//       ...editedProduct,
//       [name]: value,
//     });
//   };

//   const handleUpdateProduct = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5005/api/products/${productId}`,
//         editedProduct
//       );
//       // redirigir a la página de lista de producto después de actualizar!!!!!!!!!!
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Edit Product</h2>
//       <form>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={editedProduct.name || productData.name}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>Price:</label>
//         <input
//           type="text"
//           name="price"
//           value={editedProduct.price || productData.price}
//           onChange={handleInputChange}
//         />
//         <br />
//         <br />
//         <button onClick={handleUpdateProduct}>Update Product</button>
//       </form>
//     </div>
//   );
// }

// export default EditProduct;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditProduct = () => {
//   const navigate = useNavigate();
//   const { productId } = useParams();
//   const [productData, setProductData] = useState({});
//   const [editedProduct, setEditedProduct] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5005/api/products/${productId}`
//         );
//         setProductData(response.data);
//         setIsLoading(false);
//         setEditedProduct(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getProduct();
//   }, [productId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct({
//       ...editedProduct,
//       [name]: value,
//     });
//   };

//   const handleUpdateProduct = async () => {
//     try {
//       await axios.put(`http://localhost:5005/api/products/${productId}`,editedProduct);
//       // Redirigir a la página de lista de productos después de actualizar!!!!!!!!!!!!!!!!!
//       navigate("/admin/product-list");
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };
  

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Edit Product</h2>
//       <form>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={editedProduct.name || productData.name}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>Price:</label>
//         <input
//           type="text"
//           name="price"
//           value={editedProduct.price || productData.price}
//           onChange={handleInputChange}
//         />
//         <br />
//         <button onClick={handleUpdateProduct}>Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;




import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const [editedProduct, setEditedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/products/${productId}`
        );
        setProductData(response.data);
        setIsLoading(false);
        setEditedProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault(); // Evitar la recarga del formulario

    try {
      await axios.put(`http://localhost:5005/api/products/${productId}`, editedProduct);
      navigate("/admin/product-list");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdateProduct}
      className="reservation-form">
        <div className="form-group">
        <label>Name:</label>
        <input
          type="name"
          name="name"
          value={editedProduct.name || productData.name}
          onChange={handleInputChange}
        />
        </div>
        <br />
        <div className="form-group">
          <label>Price:</label>
        <input
          type="name"
          name="price"
          value={editedProduct.price || productData.price}
          onChange={handleInputChange}
        />
        </div>
        <br />
        <div className="form-group">
        <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;


