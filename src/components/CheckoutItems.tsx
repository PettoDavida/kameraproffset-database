import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import "./CheckoutItems.css";
import "./ShoppingCart.css";

export default function CheckOutItems(): JSX.Element {
  const { cartItems } = useContext(ShoppingCartContext);

  return (
    <div>
      <div>
        {cartItems.map((item) => (
          <div>
            <Card className="cardContainer" key={item.id}>
              <div className="image">
                <h1>{item.title}</h1>
                <CardMedia
                  className="Img"
                  component="img"
                  alt={item.title}
                  height="auto"
                  image={item.image}
                  title={item.title}
                />
              </div>

              <div className="productInfo">
                <CardContent></CardContent>
                <CardActions>
                  <Typography>{item.quantity} st</Typography>
                </CardActions>
                <Typography>{item.quantity * item.price}:- </Typography>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
