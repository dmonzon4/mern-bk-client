import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

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

      // const userRole = response.data.payload.role;
      // console.log(userRole)

      // este token lo vamos a almacenar de una forma segura en ese localStorage
      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser() // authenticateUser es asincrona y queremos ejecutarla antes de redireccionar al usuario

      navigate("/");
      // if (userRole === "admin") {
      //   navigate("/admin/management");
      // } else {
      //   navigate("/");
      // }
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
    <div className="form-container">

      <h2>Login</h2>

      <form onSubmit={handleLogin} className="reservation-form">

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="input-field"
        />
        </div>

        <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="input-field"
        />
        </div>

        <div className="form-group">
        <button type="submit" className="submit-button">Login</button>
        </div>

        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
      
    </div>
  );
}

export default Login;