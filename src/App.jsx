import "./App.css";
import { Routes, Route } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";

// user-pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";
import Areas from "./pages/Areas";
import FoodMenu from "./pages/FoodMenu";
import DrinkMenu from "./pages/DrinkMenu";
import Reservation from "./pages/Reservation";
import NewReservation from "./pages/NewReservation";
import ReservationManagement from "./pages/ReservationManagement";

// admin-pages
import Management from "./pages/admin/Management";
import ProductList from "./pages/admin/ProductList";
import AddProduct from "./pages/admin/AddProduct";
import AreaList from "./pages/admin/AreaList";
import AddArea from "./pages/admin/AddArea";
import ReservationList from "./pages/admin/ReservationList";
import ReservationManagementAdmin from "./pages/admin/ReservationManagementAdmin";

// error-pages
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";

// components
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate";
import EditProduct from "./components/EditProduct";



export default function App() {
  // const { userRole } = useContext(AuthContext);
  return (
    <>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/food-menu" element={<FoodMenu />} />
        <Route path="/drink-menu" element={<DrinkMenu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation/:reservationId/reservation-management" element={<ReservationManagement />} />
        <Route path="/reservation/:reservationId/reservation-management-admin" element={<ReservationManagementAdmin />} />
        {/* <Route path="/reservation/:reservationId/reservation-list" element={<ReservationList/>} /> */}
        <Route path="/new-reservation" element={<NewReservation />} />

        {/* rutas privadas */}
        <Route path="/admin/management" element={<IsPrivate><Management /></IsPrivate>}/>
        <Route path="/admin/area-list" element={<IsPrivate><AreaList /></IsPrivate>} />
        <Route path="/admin/add-area" element={<IsPrivate><AddArea /></IsPrivate>} />
        <Route path="/admin/product-list" element={<IsPrivate><ProductList /></IsPrivate>} />
        <Route path="/admin/add-product" element={<IsPrivate><AddProduct /></IsPrivate>} />
        <Route path="/admin/reservation-list" element={<IsPrivate><ReservationList /></IsPrivate>} />
        {/* <Route path="/reservation/:reservationId/reservation-list" element={<ReservationList/>} /> */}
        {/* <Route path="/admin/product-list" element={<IsPrivate><ProductList /></IsPrivate>} /> */}
        <Route path="/admin/:productId/edit-product" element={<IsPrivate><EditProduct /></IsPrivate>} />
        
        {/* {userRole === "admin" ? (
          <Route path="/admin/management" element={<IsPrivate><Management /></IsPrivate>} />) : null} */}
        {/* {userRole === "admin" ? (
          <Route path="/admin/product-list" element={<ProductList />} />) : null}
        {userRole === "admin" ? (
          <Route path="/admin/add-product" element={<AddProduct />} />) : null}
        {userRole === "admin" ? (
          <Route path="/admin/all-reservations" element={<AllReservations />} />) : null} */}

        {/* error FE routes */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
