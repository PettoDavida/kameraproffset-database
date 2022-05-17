import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/ShoppingCartContext";
import { Product } from "../interfaces/interfaces";
import "./Productinfo.css";
import ProductInfoImageSlider from "./ProductInfoImageSlider";
import ProductTab from "./ProductTab";

interface Props {
  product: Product;
}

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

function ProductInfo(props: Props) {
  // const { activeProduct } = useContext(ActiveProductContext);
  const { product } = props;
  const { handleAddProduct } = useCart();

  return (
    <ThemeProvider theme={theme}>
      <div className="product-info-container">
        <Link to="/">
          <ArrowBackIcon sx={{ fontSize: "2.2rem" }} className="back-arrow" />
        </Link>

        <ProductInfoImageSlider product={product} />

        <div className="right-product-container" key={product.id}>
          <h2 className="product-info-title">{product.title}</h2>
          <ProductTab product={product} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="product-info-price">{product.price} :-</p>
            <Button
              style={{ height: "2rem", margin: "1rem 0" }}
              onClick={() => handleAddProduct(product)}
              variant="contained"
              size="small"
              color="secondary"
            >
              Lägg i kundvagn
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProductInfo;
