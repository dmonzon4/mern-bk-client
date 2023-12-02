import "./App.css";
import { Routes, Route } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";

// user-pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// error-pages
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";

// admin-pages
import Management from "./pages/admin/Management";
import ProductList from "./pages/admin/ProductList";
import AddProduct from "./pages/admin/AddProduct";
import AllReservations from "./pages/admin/AllReservations";


// components
import Navbar from "./components/Navbar";

// import IsPrivate from "./components/IsPrivate";

export default function App() {
  const { userRole } = useContext(AuthContext);
  return (
    <>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* rutas privadas */}
        {/* <Route path="admin/managament" element={ <IsPrivate><Management /></IsPrivate> }/> */}
        {userRole === "admin" ? (
          <Route path="/admin/management" element={<Management />} />) : null}
        {userRole === "admin" ? (
          <Route path="/admin/product-list" element={<ProductList />} />) : null}
        {userRole === "admin" ? (
          <Route path="/admin/add-product" element={<AddProduct />} />) : null}
        {userRole === "admin" ? (
          <Route path="/admin/all-reservations" element={<AllReservations />} />) : null}

        {/* error FE routes */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
