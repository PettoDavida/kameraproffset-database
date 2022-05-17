import { BrowserRouter } from "react-router-dom";
import ProductProvider from "../contexts/ProductContext";
import ShoppingCartProvider from "../contexts/ShoppingCartContext";
import Layout from "./Layout";
import ConfirmationProvider from "../contexts/confirmationContext";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <ShoppingCartProvider>
          <ConfirmationProvider>
            <Layout />
          </ConfirmationProvider>
        </ShoppingCartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
