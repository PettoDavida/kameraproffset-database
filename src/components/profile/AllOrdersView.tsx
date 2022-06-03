import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
} from "@mui/material";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import {
  getImageUrl,
  getUserById,
  OrderBackend,
  ProductBackend,
  UserBackend,
} from "../../utils/backend";
import { getLoginToken } from "../../utils/token";

export default function AllOrdersView() {
  const [orders, setOrders] = useState<OrderBackend[]>([]);

  const getOrdersFromBackend = async () => {
    let token = getLoginToken();
    let headers: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await fetch("http://localhost:3000/api/order", headers);
    let data = await res.json();
    setOrders(data);
  };

  const [users, setUsers] = useState<Map<String, UserBackend>>();

  const getUsers = async () => {
    let userIds = new Set<String>();

    orders.map((order: OrderBackend) => {
      userIds.add(order.userID);
    });

    let arr = Array.from(userIds);
    let users = new Map<String, UserBackend>();
    for (let id of arr) {
      let res = await getUserById(id);
      let user: UserBackend = await res.json();
      users.set(id, user);
    }

    setUsers(users);
  };

  useEffect(() => {
    getOrdersFromBackend();
  }, []);

  useEffect(() => {
    getUsers();
  }, [orders]);

  return (
    <div>
      {orders.map((item: OrderBackend, i: number) => (
        <Accordion key={i} sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Typography>Order #{item._id}</Typography>
              <Typography>{item.sent ? "Skickad" : "ej skickad"}</Typography>
              <Typography>
                {DateTime.fromISO(item.createdAt.toString())
                  .setLocale("sv")
                  .toLocaleString(DateTime.DATETIME_SHORT)}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Produkter:</Typography>
            <div className="orderProducts">
              {item.products.map((item: ProductBackend, i: number) => {
                // console.log(item);

                return (
                  <div key={i}>
                    <Typography>{item.title}</Typography>
                    <img
                      src={getImageUrl(item.images[0])}
                      alt=""
                      width="200px"
                    />
                    <Typography>{item.price} :-</Typography>
                    <Typography>Kvanitet: {item.quantity}</Typography>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <div className="deliveryAddress">
                <Typography>
                  Förnamn: {item.deliveryAddress.firstName}
                </Typography>
                <Typography>
                  Efternamn: {item.deliveryAddress.lastName}
                </Typography>
                <Typography>
                  Telefon: {item.deliveryAddress.phoneNumber}
                </Typography>
                <Typography>Ort: {item.deliveryAddress.city}</Typography>
                <Typography>
                  Leverans Adress: {item.deliveryAddress.street}{" "}
                  {item.deliveryAddress.zipcode}
                </Typography>
              </div>
              <div className="deliveryOption">
                <Typography>Leverantör: {item.deliveryOption.title}</Typography>
                <Typography>Pris: {item.deliveryOption.price} :-</Typography>
                <Typography>
                  Uppskattad leveranstid:{" "}
                  {DateTime.fromISO(
                    item.deliveryOption.expectedArrival.toString()
                  )
                    .setLocale("sv")
                    .toLocaleString(DateTime.DATETIME_SHORT)}
                </Typography>
              </div>
              <div className="totalpris">
                <Typography>
                  Totalpris:
                  {item.products.reduce<number>(
                    (acc: number, item: ProductBackend) => {
                      return acc + item.price * (item.quantity || 0);
                    },
                    item.deliveryOption.price
                  )}{" "}
                  :-
                </Typography>
              </div>
            </div>
            <br />
            <div className="Userthatordered">
              <Typography>
                Order placerare: {users?.get(item.userID)?.email}
              </Typography>
            </div>
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
