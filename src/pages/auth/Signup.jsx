import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";


function Signup() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // aui lo que falta

  // estado para el manejo de mensajes de error
  const [ errorMessage, setErrorMessage ] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui
    try {
      const newUser = { username, email, password, phoneNumber }

      // await axios.post("http://localhost:5005/api/auth/signup", newUser)
      await service.post("/auth/signup", newUser)
      navigate("/login")

    } catch (error){
      console.log(error)
      console.log(error.response.status)
      console.log(error.response.data.errorMessage)
      // abajo primero analiza que error.response exista
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error") // (500)
      }
    }
  };

  return (
    <div className="form-container">

      <h2>Signup</h2>
    
      <form onSubmit={handleSignup} className="reservation-form">
        
      <div className="form-group">
        <label>Username:</label>
        <input
          type="name"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          className="input-field"
        />
        </div>
        <br />

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
        <br />

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
        <br />

        <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="input-field"
        />
        </div>
        <br />

        <div className="submit-button">
        <button type="submit">Signup</button>
        </div>


        <p style={{color: "red"}}>{errorMessage}</p>
      </form>
      
    </div>
  );
}

export default Signup;
