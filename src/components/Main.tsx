import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import CheckOut from "./CheckOutPage";
import Confirmation from "./confirmationPage";
import LogInPage from "./login";
import ProductInfo from "./Productinfo";
import ProfileOrAdminPage from "./profile/ProfileOrAdminPage";
import ShoppingCartPage from "./ShoppingCartPage";
import SignUpPage from "./SignUp";
import Store from "./Store";

function Main() {
  const { products } = useContext(ProductContext);
  return (
    <main style={{ height: "calc(100vh - 3rem)" }}>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/ProfileOrAdminPage" element={<ProfileOrAdminPage />} />
        <Route path="/ShoppingCartPage" element={<ShoppingCartPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/LogIn" element={<LogInPage />} />

        <Route path="/CheckOut" element={<CheckOut />} />
        <Route
          path="/ConfirmationPage/:customerName"
          element={<Confirmation />}
        />
        <Route path="/:id" element={<ProductInfo />} />
      </Routes>
    </main>
  );
}

export default Main;
