import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  const { isLoggedIn, authenticateUser, userRole } = useContext(AuthContext);

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  if (isLoggedIn) {
    if (userRole === "admin") {
      return (
        <nav>
          <NavLink to="/" style={toggleStyles(true)}>Home</NavLink>
          <NavLink to="/admin/management" style={toggleStyles(true)}>Management</NavLink>
          <NavLink to="/profile" style={toggleStyles(true)}>Profile</NavLink>
          <NavLink to="/logout" style={toggleStyles(true)}>Logout</NavLink>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to="/" style={toggleStyles(true)}>Home</NavLink>
          <NavLink to="/new-reservation" style={toggleStyles(true)}>New Reservation</NavLink>
          <NavLink to="/profile" style={toggleStyles(true)}>Profile</NavLink>
          <NavLink to="/logout" style={toggleStyles(true)}>Logout</NavLink>
        </nav>
      );
    }
  } else {
    return (
      <nav>
        <NavLink to="/" style={toggleStyles(true)}>Home</NavLink>
        <NavLink to="/signup" style={toggleStyles(true)}>Signup</NavLink>
        <NavLink to="/login" style={toggleStyles(true)}>Login</NavLink>
      </nav>
    );
  }

}
