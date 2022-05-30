import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./CSS/OrderView.css";
import { ProductBackend } from "../../utils/backend";
import { getTokenData } from "../../utils/token";

interface Address {
  street: String;
  zipcode: Number;
  city: String;
  firstName: String;
  lastName: String;
}

interface Delivery {
  title: String;
  price: Number;
  info: String;
  expectedArrival: Date;
  image: String;
}

interface Order {
  userID: String;
  products: ProductBackend[];
  deliveryAddress: Address;
  deliveryMethod: Delivery;
  sent: Boolean;
}

export default function OrderView() {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrdersFromBackend = async () => {
    const token = localStorage.getItem("loginToken");
    if (!token) return;

    const tokenData = getTokenData(token);

    let headers: RequestInit = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`http://localhost:3000/api/order/user/${tokenData.id}`, headers)
      .then((res: Response) => {
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrdersFromBackend();
  }, []);

  return (
    <div className="viewOwnOrders">
      {orders.map((item: Order, i: number) => (
        <Accordion key={i} sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.userID}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.products[0].title}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
