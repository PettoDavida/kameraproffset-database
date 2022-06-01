import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductProvider from "../contexts/ProductContext";
import ShoppingCartProvider from "../contexts/ShoppingCartContext";
import Layout from "./Layout";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <ShoppingCartProvider>
          <ConfirmationProvider>
            <Header />
            <ToastContainer />
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
              <Route
                path="/ConfirmationPage/:customerName"
                element={<Confirmation />}
              />

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
