import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import AdminPage from "./AdminPage";
import CheckOut from "./CheckOutPage";
import Confirmation from "./confirmationPage";
import ProductInfo from "./Productinfo";
import ShoppingCartPage from "./ShoppingCartPage";
import Store from "./Store";

function Main() {
  const { products } = useContext(ProductContext);
  return (
    <main>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/ShoppingCartPage" element={<ShoppingCartPage />} />

        <Route path="/CheckOut" element={<CheckOut />} />
        <Route
          path="/ConfirmationPage/:customerName"
          element={<Confirmation />}
        />

        {products.map((item) => (
          <Route
            key={item.id}
            path={item.title.replaceAll(" ", "-")}
            element={<ProductInfo product={item} />}
          />
        ))}
      </Routes>
    </main>
  );
}

export default Main;
