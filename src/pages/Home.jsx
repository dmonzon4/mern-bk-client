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
        // console.log(response.data.payload.username)
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
      <h2>Welcome {username}!</h2>
      <h1>Bayerische Küche</h1>
      <nav>
          <NavLink to="/areas" style={toggleStyles(true)}>See our areas</NavLink>
          <br />
          <br />
          <img src="images/Terrasse.jpg" alt="Areas Image" style={{ width: '350px', height: '250px' }}/>
          <br />
          <br />
          <NavLink to="/food-menu" style={toggleStyles(true)}>Explore our food</NavLink>
          <br />
          <br />
          <img src="images/Miso-spaetzle.jpg" alt="Food Image" style={{ width: '350px', height: '250px' }}/>
          <br />
          <br />
          <NavLink to="/drink-menu" style={toggleStyles(true)}>Explore our drinks</NavLink>
          <br />
          <br />
          <img src="images/Getraenke.jpg" alt="Drink Image" style={{ width: '350px', height: '250px' }}/>
      </nav>
    </div>
  );
}

export default Home;
