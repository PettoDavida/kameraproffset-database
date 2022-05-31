import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/ShoppingCartContext";
import "../CSS/Productinfo.css";
import { ProductBackend } from "../utils/backend";
import ProductInfoImageSlider from "./ProductInfoImageSlider";
import ProductTab from "./ProductTab";
import { useLocation } from "react-router-dom";
import { PropsFor } from "@mui/system";
import { ProductContext } from "../contexts/ProductContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
      contrastText: "#FBF7F5", //button text white instead of black
    },
    background: {
      default: "#333333",
    },

    secondary: {
      main: "#DA344D",
    },
  },
});

export default function ProductInfo() {
  const { products } = useContext(ProductContext);
  const [activeProduct, setActiveProduct] = useState<ProductBackend[]>([]);
  const { handleAddProduct } = useCart();
  const location = useLocation();
  const id = location.pathname;
  console.log(id);

  const specificProductById = async () => {
    let headers: RequestInit = {
      method: "GET",
    };
    fetch(`http://localhost:3000/api/products${id}`, headers)
      .then((res) => res.json())
      .then((data) => {
        setActiveProduct(data);
      });
  };

  useEffect(() => {
    specificProductById();
  }, []);

  console.log(activeProduct);

  return (
    <ThemeProvider theme={theme}>
      <div className="product-info-container">
        {/* <Link to="/">
          <ArrowBackIcon sx={{ fontSize: "2.2rem" }} className="back-arrow" />
        </Link>
        {<ProductInfoImageSlider product={products} />}

        <div className="right-product-container">
          <h2 className="product-info-title">{activeProduct}</h2>
          <ProductTab product={products} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="product-info-price">{activeProduct.title} :-</p>
            <Button
              style={{ height: "2rem", margin: "1rem 0" }}
              onClick={() => handleAddProduct()}
              variant="contained"
              size="small"
              color="secondary"
            >
              Lägg i kundvagn
            </Button>
          </div>
        </div> */}
      </div>
    </ThemeProvider>
  );
}
