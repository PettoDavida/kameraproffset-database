import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import { ProductBackend, getImageUrl } from "../utils/backend";
import "./CheckoutItems.css";
import "./ShoppingCart.css";

export default function CheckOutItems(): JSX.Element {
  const { cartItems } = useContext(ShoppingCartContext);

  return (
    <div>
      <div>
        {cartItems.map((item: ProductBackend, i: number) => (
          <div>
            <Card className="cardContainer" key={i}>
              <div className="image">
                <h1>{item.title}</h1>
                <CardMedia
                  className="Img"
                  component="img"
                  alt="image"
                  height="auto"
                  image={getImageUrl(item.images[0])}
                  title={item.title.toString()}
                />
              </div>

              <div className="productInfo">
                <CardContent></CardContent>
                <CardActions>
                  <Typography>{item.quantity} st</Typography>
                </CardActions>
                <Typography>{item.quantity! * item.price}:- </Typography>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
