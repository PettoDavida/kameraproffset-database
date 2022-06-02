import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Button,
  Card,
  CardActions,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import {
  mockedPay,
  PaySelection,
  PersonalData,
} from "../interfaces/interfaces";
import { CardPayment, CardInfo } from "./CardPayment";
import "../CSS/checkOutAccordion.css";
import { useUser } from "../contexts/confirmationContext";
import Shipping from "./Shipping";
import { SwishPayment, SwishInfo } from "./SwishPayment";
import { FakturaPayment, FakturaInfo } from "./FakturaPayment";
import {
  ProductBackend,
  getImageUrl,
  getPayments,
  PaymentBackend,
  Address,
  getDeliveries,
  DeliveryBackend,
  getCurrentUser,
  UserBackend,
  createOrder,
} from "../utils/backend";
import { getLoginToken, getTokenData } from "../utils/token";
import { userInfo } from "os";
import { CheckBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

enum PaymentType {
  Empty = 0,
  Kort,
  Swish,
  Faktura,
}

interface PaymentInfo {
  type: PaymentType;

  cardInfo?: CardInfo;
  swishInfo?: SwishInfo;
  fakturaInfo?: FakturaInfo;
}

export default function CheckOutAccordion() {
  const { confirm } = useUser();
  const { cartItems } = React.useContext(ShoppingCartContext);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const [currentUser, setCurrentUser] = useState<UserBackend>();

  const [userInfo, setUserInfo] = useState<Address>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();

  const [payments, setPayments] = useState<PaymentBackend[]>([]);
  const [deliveries, setDeliveries] = useState<DeliveryBackend[]>([]);

  const [paymentIndex, setPaymentIndex] = useState<number>();
  const [deliveryIndex, setDeliveryIndex] = useState<number>();

  const navigate = useNavigate();
  let loggedIn = getLoginToken();

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity!,
    0
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const updatePayments = async () => {
    let res = await getPayments();
    let payments = await res.json();
    setPayments(payments);
  };

  const updateDeliveries = async () => {
    let res = await getDeliveries();
    let deliveries = await res.json();
    setDeliveries(deliveries);
  };

  const updateUser = async () => {
    let res = await getCurrentUser();
    let user = await res.json();
    setCurrentUser(user);
  };

  useEffect(() => {
    updatePayments();
    updateDeliveries();
    updateUser();
  }, []);

  const canConfirm = () => {
    return (
      userInfo !== undefined &&
      paymentInfo !== undefined &&
      paymentIndex !== undefined &&
      deliveryIndex !== undefined
    );
  };

  return (
    <div className="checkoutPageContainer">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ width: "100%" }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Personuppgifter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Shipping
            submitUserInfo={(data) => setUserInfo(data)}
            nextPanel={() => setExpanded("panel2")}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ width: "100%" }}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Betalningsalternativ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"div"} className="DeliveryForm">
            <RadioGroup
              onChange={(e, value) => {
                let index = parseInt(value);
                setPaymentIndex(index);
              }}
            >
              {payments.map((payment: PaymentBackend, i: number) => (
                <div key={i}>
                  <Radio value={i} />
                  <div className="info">
                    <div>
                      <p>{payment.title}</p>
                      <p>{payment.desc || ""}</p>
                      <p>{payment.info || ""}</p>
                      <p>Avgift{" " + payment.price}:-</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </Typography>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            disabled={paymentIndex === undefined}
            onClick={() => setExpanded("panel3")}
          >
            Bekräfta
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ width: "100%" }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Betalning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"div"}>
            {paymentIndex !== undefined ? (
              payments[paymentIndex].title === "Faktura" ? (
                <FakturaPayment
                  email={currentUser !== undefined ? currentUser.email : ""}
                  submitPaymentInfo={(info) => {
                    setPaymentInfo({
                      type: PaymentType.Faktura,
                      fakturaInfo: info,
                    });
                  }}
                  nextPanel={() => setExpanded("panel4")}
                />
              ) : (
                <div />
              )
            ) : (
              <div />
            )}
            {paymentIndex !== undefined ? (
              payments[paymentIndex].title === "Kortbetalning" ? (
                <CardPayment
                  submitPaymentInfo={(info) => {
                    setPaymentInfo({ type: PaymentType.Kort, cardInfo: info });
                  }}
                  nextPanel={() => setExpanded("panel4")}
                />
              ) : (
                <div />
              )
            ) : (
              <div />
            )}

            {paymentIndex !== undefined ? (
              payments[paymentIndex].title === "Swish" ? (
                <SwishPayment
                  phoneNumber={userInfo ? userInfo?.phoneNumber : ""}
                  submitPaymentInfo={(info) => {
                    setPaymentInfo({
                      type: PaymentType.Swish,
                      swishInfo: info,
                    });
                  }}
                  nextPanel={() => setExpanded("panel4")}
                />
              ) : (
                <div />
              )
            ) : (
              <div />
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/*Fraktuppgifter liggandes i andra accordion*/}
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        sx={{ width: "100%" }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Leveransuppgifter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "1rem 0",
              }}
              onChange={(e, value) => {
                let index = parseInt(value);
                setDeliveryIndex(index);
              }}
            >
              {deliveries.map((item, i) => (
                <FormControlLabel
                  key={i}
                  value={i}
                  control={<Radio />}
                  label={item.title.toString() + "  " + item.price + ":-"}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={() => setExpanded("panel5")}
          >
            Bekräfta
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        onChange={handleChange("panel5")}
        expanded={expanded === "panel5" && canConfirm()}
        sx={{ width: "100%" }}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Översikt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"div"}>
            <div className="person">
              <h3>Personuppgifter</h3>
              <p>Telefon: {userInfo ? userInfo?.phoneNumber : ""}</p>
              <p>Förnamn: {userInfo ? userInfo?.firstName : ""}</p>
              <p>Efternamn: {userInfo ? userInfo?.lastName : ""}</p>
              <p>Postnr: {userInfo ? userInfo?.zipcode : ""}</p>
              <p>Adress: {userInfo ? userInfo?.street : ""}</p>
              <p>Stad: {userInfo ? userInfo?.city : ""}</p>
              <div>
                <hr />
                <h3>Leveranssätt</h3>
                {deliveries.length > 0
                  ? deliveries[deliveryIndex || 0].title
                  : ""}
                <br />
                {deliveries.length > 0
                  ? deliveries[deliveryIndex || 0].price + " :-"
                  : ""}
                <hr />
                <h3>Betalning</h3>
                <p>
                  {payments.length > 0 ? payments[paymentIndex || 0].title : ""}
                </p>
                <p>
                  {payments.length > 0
                    ? payments[paymentIndex || 0].price + " :-"
                    : ""}
                </p>
              </div>
              <hr />
              <div>
                <h3>Valda produkter</h3>

                {cartItems.map((item: ProductBackend, i: number) => (
                  <div className="product-checkout-container" key={i}>
                    <Card className="product-checkout-width">
                      <h1>{item.title}</h1>
                      <div className="image-checkout-container">
                        <img src={getImageUrl(item.images[0])} alt="" />

                        <CardActions>
                          <Typography>{item.quantity} st</Typography>
                        </CardActions>
                        <Typography>
                          {item.quantity! * item.price}:-{" "}
                        </Typography>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              <hr />
              Totalpris: {totalCost} kr
              <div>Moms: {totalCost * 0.25} kr</div>
            </div>
            <br />
            {loggedIn != null ? (
              <Button
                onClick={() => {
                  let removeStock = cartItems.map(
                    (item: ProductBackend, i: Number) => {
                      delete item.stock;
                      return item;
                    }
                  );

                  if (deliveryIndex !== undefined && userInfo !== undefined && paymentIndex !== undefined) {
                    createOrder(
                      removeStock,
                      deliveries[deliveryIndex],
                      userInfo,
                      payments[paymentIndex]
                    )
                      .then((res) => res.json())
                      .then((order) => {
                        navigate(`/ConfirmationPage/${order._id}`);
                      });
                  }
                }}
                disabled={false}
                variant="contained"
                sx={{ width: "100%" }}
              >
                Slutför köp
              </Button>
            ) : (
              <Button
                disabled={true}
                variant="contained"
                sx={{ width: "100%" }}
              >
                Slutför köp
              </Button>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
