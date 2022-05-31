import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProductBackend } from "../../utils/backend";

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
  _id: String;
  userID: String;
  products: ProductBackend[];
  deliveryAddress: Address;
  deliveryMethod: Delivery;
  sent: Boolean;
}

export default function AllOrdersView() {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrdersFromBackend = async () => {
    let headers: RequestInit = {
      method: "GET",
    };
    fetch("http://localhost:3000/api/order", headers)
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
    <div>
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
            <Typography>
              Order#{item._id} has
              {item.sent ? " been sent" : " not been sent"}
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                const token = localStorage.getItem("loginToken");
                if (!token) return;

                let headers: RequestInit = {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                fetch(`http://localhost:3000/api/order/${item._id}`, headers)
                  .then((res: Response) => {
                    return res.json();
                  })
                  .then(() => {
                    getOrdersFromBackend();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Change Order To Sent
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                const token = localStorage.getItem("loginToken");
                if (!token) return;

                let headers: RequestInit = {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                fetch(`http://localhost:3000/api/order/${item._id}`, headers)
                  .then((res: Response) => {
                    return res.json();
                  })
                  .then(() => {
                    getOrdersFromBackend();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Remove Order
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
