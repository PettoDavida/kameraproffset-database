import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "../../CSS/AdminPage.css";
import AddIcon from "@mui/icons-material/Add";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NewProductForm from "./NewProductForm";
import { Close } from "@mui/icons-material";

interface Product {
  _id: String;
  title: String;
  price: Number;
  images: String[];
  longInfo: String;
  info: String[];
  category: String[];
  stock?: number;
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

function ManageProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProductFromBackend = async () => {
    let headers: RequestInit = {
      method: "GET",
    };
    fetch("http://localhost:3000/api/products", headers)
      .then((res: Response) => {
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductFromBackend();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="admin-top-container">
        <div className="admin-edit-button">
          <Button
            onClick={handleClickOpen}
            variant="contained"
            size="large"
            color="primary"
          >
            <AddIcon /> Lägg till produkt
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogActions>
              <Button onClick={handleClose}>
                <Close />
              </Button>
            </DialogActions>
            <DialogTitle>Create new product</DialogTitle>
            <DialogContent>
              <DialogContentText>
                If a field has * it's required
              </DialogContentText>
              <NewProductForm />
            </DialogContent>
          </Dialog>
        </div>
        <div className="admin-container">
          {products.map((item: Product, i: number) => (
            <Accordion key={i} sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.longInfo}</Typography>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    onClick={() => console.log(item)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      let headers: RequestInit = {
                        method: "DELETE",
                      };
                      fetch(
                        `http://localhost:3000/api/products/${item._id}`,
                        headers
                      ).then(() => {
                        getProductFromBackend();
                      });
                    }}
                    startIcon={<DeleteForeverIcon />}
                  >
                    Remove
                  </Button>
                </ButtonGroup>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ManageProductsView;
