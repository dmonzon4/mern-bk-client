import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function ProductList() {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [foodProducts, setFoodProducts] = useState([]);
  const [drinkProducts, setDrinkProducts] = useState([]);

  const handleButtonClick = () => {
    navigate("/admin/add-product");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/products");
      console.log(response);
      setAllProducts(response.data);
      setIsLoading(false);

      const foodList = response.data.filter(
        (product) => product.category === "food"
      );
      const drinkList = response.data.filter(
        (product) => product.category === "drink"
      );

      setFoodProducts(foodList);
      setDrinkProducts(drinkList);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading === true) {
    return (
      <div
        style={{ padding: "300px", display: "flex", justifyContent: "center" }}
      >
        <PropagateLoader color={"darkorange"} size={15} />
      </div>
    );
  }

  return (
    <div>
      <h2>Available Products</h2>
      <div>
        <h3>Food Products</h3>
        {foodProducts.map((eachProduct) => {
          return (
            <div key={eachProduct._id}>
              <strong>{eachProduct.name}</strong>
              <p>Price: {eachProduct.price}</p>
              {/* <p>Category: {eachProduct.category}</p> */}
              {eachProduct.image && (
                <img
                  src={eachProduct.image}
                  alt={eachProduct.name}
                  style={{ maxWidth: "200px", maxHeight: "150px" }}
                />
              )}
              {/* <span>
                <button onClick={() => handleDelete(eachArea._id)}>
                  Delete
                </button>
              </span> */}
            </div>
          );
        })}
      </div>

      <hr />

      <div>
        <h3>Drink Products</h3>
        {drinkProducts.map((eachProduct) => (
          <div key={eachProduct._id}>
            <strong>{eachProduct.name}</strong>
            <p>Price: {eachProduct.price}</p>
            {/* <p>Category: {eachProduct.category}</p> */}
            {eachProduct.image && (
              <img
                src={eachProduct.image}
                alt={eachProduct.name}
                style={{ maxWidth: "200px", maxHeight: "150px" }}
              />
            )}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleButtonClick}>Add new product</button>
      </div>
    </div>
  );
}
