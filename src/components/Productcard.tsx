import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { useCart } from "../contexts/ShoppingCartContext";
import ProductAccordion from "./ProductAccordion";
import "../CSS/Productcard.css";
import { getImageUrl, ProductBackend } from "../utils/backend";

export default function ImgMediaCard(): JSX.Element {
  // const { products } = useContext(ProductContext);
  const { handleAddProduct } = useCart();
  const [product, setProduct] = useState<ProductBackend[]>([]);

  const getProductFromDb = async () => {
    await fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  };

  useEffect(() => {
    getProductFromDb();
  }, []);

  return (
    <div className="ProductContainer">
      {product.map((item: ProductBackend, i: number) => (
        <Card className="storeCardStyle" key={i}>
          <Link to={item._id.toString()}>
            <CardActionArea>
              <div className="ImageContainer">
                <CardMedia
                  component="img"
                  alt="image"
                  height="auto"
                  image={getImageUrl(item.images[0])}
                  title={item.title.toString()}
                />
              </div>
              <CardContent>
                <div className="InfoContainer">
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  {
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="ul"
                      className="item-short-info"
                    >
                      <li>{item.info[0]}</li>
                      <li>{item.info[1]}</li> <li>{item.info[2]}</li>
                    </Typography>
                  }
                </div>
                <div className="price">
                  <Typography variant="body2" component="p">
                    {item.price} SEK
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Link>
          <ProductAccordion info={item.longInfo.toString()} />
          <CardActions>
            <div className="buttons">
              <Button
                onClick={() => handleAddProduct(item)}
                variant="contained"
                color="secondary"
                size="small"
              >
                Lägg i kundvagn
              </Button>

              <Link to={item._id.toString()}>
                <Button variant="contained" color="primary" size="small">
                  Till produkten
                </Button>
              </Link>
            </div>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
