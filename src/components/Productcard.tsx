import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/ShoppingCartContext";
import ProductAccordion from "./ProductAccordion";
import "../CSS/Productcard.css";
import {
  CategoryBackend,
  getCategoriesFromBackend,
  getImageUrl,
  getProducts,
  getProductsByCategory,
  ProductBackend,
} from "../utils/backend";
import { ButtonGroup } from "@mui/material";

export default function ImgMediaCard(): JSX.Element {
  const { handleAddProduct } = useCart();
  const [product, setProduct] = useState<ProductBackend[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<
    ProductBackend[]
  >([]);
  const [categories, setCategories] = useState<CategoryBackend[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(true);

  const updateProductsByCategory = async (id: String) => {
    getProductsByCategory(id)
      .then((res: Response) => res.json())
      .then((data) => {
        setProductsByCategory(data);
        setShowAllProducts(false);
      });
  };

  const updateCategories = async () => {
    getCategoriesFromBackend()
      .then((res: Response) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  const updateProducts = async () => {
    getProducts()
      .then((res: Response) => res.json())
      .then((data) => {
        setProduct(data);
        setShowAllProducts(true);
      });
  };

  useEffect(() => {
    updateCategories();
    updateProducts();
  }, []);

  return (
    <div>
      <div>
        <ButtonGroup variant="contained" color="primary">
          <Button className="textWhite" onClick={updateProducts}>
            Alla kategorier
          </Button>
          {categories.map((item: CategoryBackend, i: number) => {
            return (
              <Button
                key={i}
                onClick={() => {
                  updateProductsByCategory(item._id);
                }}
              >
                {item.title}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>

      <div className="ProductContainer">
        {showAllProducts
          ? product.map((item: ProductBackend, i: number) => (
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
            ))
          : productsByCategory.map((item: ProductBackend, i: number) => (
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
    </div>
  );
}
