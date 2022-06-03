import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./CSS/OrderView.css";
import { getImageUrl, OrderBackend, ProductBackend } from "../../utils/backend";
import { getLoginToken, getTokenData } from "../../utils/token";
import { DateTime } from "luxon";

export default function OrderView() {
  const [orders, setOrders] = useState<OrderBackend[]>([]);

  const getOrdersFromBackend = async () => {
    let token = getLoginToken();
    if (!token) return;

    let tokenData = getTokenData(token);

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
      .then((data) => {
        console.log(data);

        setOrders(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrdersFromBackend();
  }, []);

  return (
    <div className="viewOwnOrders">
      {orders.length > 0 ? (
        orders.map((item: OrderBackend, i: number) => (
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
                  <Typography>
                    Leverantör: {item.deliveryOption.title}
                  </Typography>
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
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>You've got mail</Typography>
      )}
    </div>
  );
}
