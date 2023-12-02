// function Home() {
//   return (
//     <div>
//       <p>Welcome setUserRole(response.data.payload.username);</p>
//       <h1>Home</h1>
//     </div>
//   )
// }

// export default Home


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/config";

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


  return (
    <div>
      <p>Welcome {username}!</p>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
