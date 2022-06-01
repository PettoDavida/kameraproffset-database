import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductProvider from "../contexts/ProductContext";
import ShoppingCartProvider from "../contexts/ShoppingCartContext";
import ConfirmationProvider from "../contexts/confirmationContext";
import CheckOut from "./CheckOutPage";
import Confirmation from "./confirmationPage";
import LogInPage from "./login";
import ProductInfo from "./Productinfo";
import ProfileOrAdminPage from "./profile/ProfileOrAdminPage";
import ShoppingCartPage from "./ShoppingCartPage";
import SignUpPage from "./SignUp";
import Header from "./Header";
import Footer from "./Footer";
import Store from "./Store";
import MyFunction from "./testingCondRend";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <ShoppingCartProvider>
          <ConfirmationProvider>
            <Header />

            <Routes>
              <Route path="/" element={<Store />} />
              <Route
                path="/ProfileOrAdminPage"
                element={<ProfileOrAdminPage />}
              />
              <Route path="/ShoppingCartPage" element={<ShoppingCartPage />} />
              <Route path="/SignUp" element={<SignUpPage />} />
              <Route path="/LogIn" element={<LogInPage />} />

              <Route path="/testing" element={<MyFunction />} />

              <Route path="/CheckOut" element={<CheckOut />} />
              <Route path="/ConfirmationPage/:id" element={<Confirmation />} />

              <Route path="/:id" element={<ProductInfo />} />

              {/* {products.map((item, i: number) => (
                <Route
                  key={i}
                  path={item.title.replaceAll(" ", "-")}
                  element={<ProductInfo product={item} />}
                />
              ))} */}
            </Routes>
            <Footer />
          </ConfirmationProvider>
        </ShoppingCartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
