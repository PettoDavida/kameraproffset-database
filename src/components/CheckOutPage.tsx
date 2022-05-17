import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import CheckOutAccordion from "./CheckOutAccordion";
import "./CheckOutPage.css";

function CheckOut() {
  return (
    <div className="checkout-container">
      <Link to="/ShoppingCartPage">
        <ArrowBackIcon sx={{ fontSize: "2.2rem" }} className="back-arrow" />
      </Link>
      <CheckOutAccordion></CheckOutAccordion>
    </div>
  );
}

export default CheckOut;
