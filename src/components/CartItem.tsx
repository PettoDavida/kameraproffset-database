import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ShoppingCartContext, useCart } from "../contexts/ShoppingCartContext";
import "../CSS/ShoppingCart.css";

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

export default function CartItem(): JSX.Element {
  const { cartItems } = useContext(ShoppingCartContext);
  const { amountOfProducts } = useContext(ShoppingCartContext);
  const { handleAddProduct } = useCart();
  const { handleRemoveProduct } = useCart();

  if (amountOfProducts === 0) {
    return (
      <div className="emtyCart">
        <h1>Varukorgen är tom...</h1>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="test-container">
          {cartItems.map((item) => (
            <div key={item.id}>
              <Card className="test">
                <div className="image">
                  <h1>{item.title}</h1>
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="auto"
                    image={item.image}
                    title={item.title}
                  />
                </div>

                <div className="product-info">
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.price}:-
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleRemoveProduct(item)}
                    >
                      -
                    </Button>

                    <Typography style={{ marginLeft: "8px" }}>
                      {item.quantity}{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleAddProduct(item)}
                    >
                      +
                    </Button>
                  </CardActions>
                  <Typography>{item.quantity * item.price}:- </Typography>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
