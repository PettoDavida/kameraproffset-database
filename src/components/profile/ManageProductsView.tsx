import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "../../CSS/AdminPage.css";
import AddIcon from "@mui/icons-material/Add";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NewProductForm from "./NewProductForm";
import { Close } from "@mui/icons-material";
import EditProductForm from "./EditProductForm";
import { ProductBackend } from "../../utils/backend";

function ManageProductsView() {
  const [products, setProducts] = useState<ProductBackend[]>([]);
  const [open, setOpen] = useState<String>("");

  const handleClickOpen = (id: String) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen("");
    getProductFromBackend();
  };

  const isOpen = (id: String) => {
    return open === id;
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
    <div className="admin-top-container">
      <div className="admin-edit-button">
        <Button
          onClick={() => handleClickOpen("ADD_PRODUCT")}
          variant="contained"
          size="large"
        >
          <AddIcon /> Lägg till produkt
        </Button>
        <Dialog open={isOpen("ADD_PRODUCT")} onClose={handleClose}>
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
            <NewProductForm close={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="admin-container">
        {products.map((item: ProductBackend, i: number) => (
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
                  onClick={() => handleClickOpen(item._id)}
                  variant="contained"
                  size="large"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Dialog open={isOpen(item._id)} onClose={handleClose}>
                  <DialogActions>
                    <Button onClick={handleClose}>
                      <Close />
                    </Button>
                  </DialogActions>
                  <DialogTitle>Edit product {item.title}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      If a field has * it's required
                    </DialogContentText>
                    <EditProductForm product={item} close={handleClose} />
                  </DialogContent>
                </Dialog>
                <Button
                  color="error"
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
  );
}

export default ManageProductsView;
