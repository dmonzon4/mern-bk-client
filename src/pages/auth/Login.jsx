import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contactar al backend para validar credenciales de usuario aqui
    try {
      const credentials = { email, password };

      const response = await service.post("/auth/login", credentials);
      console.log(response);

      // este token lo vamos a almacenar de una forma segura en ese localStorage
      // localStorage.setItem("authToken", response.data.authToken);

      // await authenticateUser() // authenticateUser es asincrona y queremos ejecitarla antes de redireccionar al usuario

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>

      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>

        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
      
    </div>
  );
}

export default Login;