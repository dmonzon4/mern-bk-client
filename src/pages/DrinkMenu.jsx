import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import service from "../services/config";

export default function DrinkMenu() {
  const navigate = useNavigate();

  const [drinkProducts, setDrinkProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDrinkProducts();
  }, []);

  const getDrinkProducts = async () => {
    try {
      const response = await service.get("/products");
      const drinkList = response.data.filter(
        (product) => product.category === "drink"
      );
      setDrinkProducts(drinkList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading === true) {
    return (
      <div style={{ padding: "300px", display: "flex", justifyContent: "center" }}>
        <PropagateLoader color={"darkcyan"} size={15} />
      </div>
    );
  }

  return (
    <div>
      <h2>Drink Products</h2>
      {drinkProducts.map((eachProduct) => (
        <div key={eachProduct._id}>
          <strong>{eachProduct.name}</strong>
          <p>Price: {eachProduct.price}</p>
          {eachProduct.image && (
            <img
              src={eachProduct.image}
              alt={eachProduct.name}
              style={{ maxWidth: "200px", maxHeight: "150px" }}
            />
          )}
          <br />
        </div>
      ))}
    </div>
  );
}
