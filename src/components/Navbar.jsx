import { NavLink } from "react-router-dom";

export default function Navbar() {
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
    <nav>
      <NavLink to="/" style={toggleStyles}>Home</NavLink>
      <NavLink to="/signup" style={toggleStyles}>Registro</NavLink>
      <NavLink to="/login" style={toggleStyles}>Acceso</NavLink>
    </nav>
  );
}
