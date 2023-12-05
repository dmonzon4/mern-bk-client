import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config";
import { NavLink } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const { authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

    const getData = async () => {
      try {
        const response = await service.get("/auth/verify");
        console.log(response.data.payload.username)
        setUsername(response.data.payload.username);
        await authenticateUser();
      } catch (error) {
        console.log(error);
      }
    };

    const toggleStyles = (navInfo) => {
      return navInfo.isActive === true ? activeStyles : inActiveStyles;
    };

    const activeStyles = {
      textDecoration: "underline",
    };
  
    const inActiveStyles = {
      textDecoration: "none",
    };


  return (
    <div>
      <p>Welcome {username}!</p>
      <h1>Bayerische Küche</h1>
      <nav>
          <NavLink to="/areas" style={toggleStyles(true)}>See our areas</NavLink>
          <br />
          <NavLink to="/food-menu" style={toggleStyles(true)}>Explore our food</NavLink>
          <br />
          <NavLink to="/drink-menu" style={toggleStyles(true)}>Explore our drinks</NavLink>
      </nav>
    </div>
  );
}

export default Home;
