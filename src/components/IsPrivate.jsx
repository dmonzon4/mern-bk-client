import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function IsPrivate(props) {
  // const { isLoggedIn } = useContext(AuthContext);
  const { isLoggedIn, userRole } = useContext(AuthContext)

  // if (isLoggedIn) {
  //   return props.children;
  // } else {
  //   return <Navigate to={"/login"} />;
  // }

  if (isLoggedIn) {
    if (userRole === "admin") {
      return props.children;
    } else {
      return <Navigate to={"/login"} />;
    }
  }
}
