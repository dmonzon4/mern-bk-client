import { createContext, useEffect, useState } from "react";
import service from "../services/config";
import { PropagateLoader } from "react-spinners";

// 1. Componente que transmite el contexto (los estados...)
const AuthContext = createContext();

// 2. componente envoltorio en donde se crea el contexto (los estados...)
function AuthWrapper(props) {
  // aquí los estados a compartir por contexto
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 1. Loading...
  const [ loggedUser, setLoggedUser ] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  const authenticateUser = async () => {
    // esta función va a enviar el token a backend para validarlo
    // usaremos la ruta BE "/verify"
    // si el token es válido, isLoggedIn = true
    // si el token no es válido o no existe, isLoggedIn = false

    try {
      const response = await service.get("/auth/verify");
      // si el código llega a este punto significa que el token es válido
      console.log(response);
      setIsLoggedIn(true);
      setIsLoading(false); // 2. Loading...
      setLoggedUser(response.data.payload)
      setUserRole(response.data.payload.role);
      setUserName(response.data.payload.username);
    } catch (error) {
      // si el código llega a este punto (401) significa que el token no es válido o no existe
      console.log(error);
      setIsLoggedIn(false);
      setIsLoading(false)
      setLoggedUser(null)
      setUserRole(null);
      setUserName(null);
    }
  };

  // al inicio de que el usuario visita la página, valida el token para saber si es un usuario con sesión activa o no
  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = {
    authenticateUser,
    isLoggedIn,
    userRole,
    userName,
  };

  if (isLoading === true) { // 3. Loading...
    return (
      <div
        style={{ padding: "300px", display: "flex", justifyContent: "center" }}
      >
        <PropagateLoader color={"darkorange"} size={15} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children} {/* props.children será toda nuestra App */}
    </AuthContext.Provider>
  );
}


export { AuthContext, AuthWrapper };
