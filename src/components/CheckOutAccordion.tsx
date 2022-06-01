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
import CardPayment from "./CardPayment";
import "../CSS/checkOutAccordion.css";
import FakturaPayment from "./FakturaPayment";
import { useUser } from "../contexts/confirmationContext";
import Shipping from "./Shipping";
import SwishPayment from "./SwishPayment";
import { ProductBackend, Delivery, getImageUrl } from "../utils/backend";
import { isTemplateExpression } from "typescript";
import { getLoginToken } from "../utils/token";

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

export default function CheckOutAccordion() {
  const { confirm } = useUser();
  const { cartItems } = React.useContext(ShoppingCartContext);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [deliveryIndex, setDeliveryIndex] = useState(0);

  let loggedIn = getLoginToken();

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity!,
    0
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const defaultPaymentState: PaySelection[] = mockedPay.map((paymethod) => ({
    paymethod,
    paychecked: false,
  }));

  const [checkboxesPay, setCheckboxesPay] =
    React.useState<PaySelection[]>(defaultPaymentState);

  const [personalInfo, setPersonalInfo] = useState<PersonalData>({
    email: "",
    name: "",
    phone: "",
    postnr: "",
    street: "",
  });

  function sendPersonalData(personaldata: PersonalData) {
    setPersonalInfo(personaldata);
  }

  const areAllFieldsFilled = () => {
    if (
      personalInfo.email?.length >= 5 &&
      personalInfo.name?.length &&
      personalInfo.phone.toString().length >= 7 &&
      personalInfo.postnr?.toString().length === 5 &&
      personalInfo.street?.length
    ) {
      return false;
    } else return true;
  };

  const [deliveryFromDb, setDeliveryFromDb] = useState<Delivery[]>([]);

  const getDeliveryData = async () => {
    await fetch("http://localhost:3000/api/delivery")
      .then((res) => res.json())
      .then((data) => {
        setDeliveryFromDb(data);
      });
  };

  useEffect(() => {
    getDeliveryData();
  }, []);

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
          <Shipping sendPersonalData={sendPersonalData} />
          <Button
            variant="contained"
            disabled={Boolean(areAllFieldsFilled())}
            onClick={() => setExpanded("panel2")}
            size="medium"
            sx={{ width: "100%" }}
          >
            Bekräfta
          </Button>
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
            {checkboxesPay.map((CheckBox) => (
              <div key={CheckBox.paymethod.id}>
                <FormGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "1rem 0",
                  }}
                >
                  <Checkbox
                    onChange={() => {
                      let checkboxPayListToUpdate = checkboxesPay;

                      checkboxPayListToUpdate.forEach((tempCheckbox) => {
                        tempCheckbox.paychecked = false;
                      });

                      const currentBoxIndex = mockedPay.findIndex(
                        (item) => item.id === CheckBox.paymethod.id
                      );

                      checkboxPayListToUpdate[currentBoxIndex].paychecked =
                        true;

                      setCheckboxesPay([...checkboxPayListToUpdate]);
                    }}
                    checked={CheckBox.paychecked}
                  />

                  <div className="info" key={CheckBox.paymethod.id}>
                    <div>
                      <p>{CheckBox.paymethod.info}</p>
                      <p>{CheckBox.paymethod.alt}</p>
                      <p>Avgift{" " + CheckBox.paymethod.price}:-</p>
                    </div>
                  </div>
                </FormGroup>
              </div>
            ))}
          </Typography>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            disabled={
              checkboxesPay.find((item) => item.paychecked === true)
                ? false
                : true
            }
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
            {checkboxesPay.find((item) => item.paychecked === true)?.paymethod
              .title === "Kortbetalning" ? (
              <CardPayment triggerNextAccordion={() => setExpanded("panel4")} />
            ) : checkboxesPay.find((item) => item.paychecked === true)
                ?.paymethod.title === "Swish" ? (
              <SwishPayment
                telnumber={personalInfo.phone}
                triggerNextAccordion={() => setExpanded("panel4")}
              />
            ) : checkboxesPay.find((item) => item.paychecked === true)
                ?.paymethod.title === "Faktura" ? (
              <FakturaPayment
                email={personalInfo.email}
                triggerNextAccordion={() => setExpanded("panel4")}
              />
            ) : (
              <p>Ingen betalningsmetod vald</p>
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
              {deliveryFromDb.map((item, i) => (
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
        expanded={expanded === "panel5"}
        sx={{ width: "100%" }}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Översikt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"div"}>
            <div className="person">
              <h3>Personuppgifter</h3>
              <p>Telefon: {personalInfo.phone}</p>
              <p>Email: {personalInfo.email}</p>
              <p>Namn: {personalInfo.name}</p>
              <p>Postnr: {personalInfo.postnr}</p>
              <p>Adress: {personalInfo.street}</p>
              <div>
                <hr />
                <h3>Leveranssätt</h3>
                {deliveryFromDb.length > 0
                  ? deliveryFromDb[deliveryIndex].title
                  : "loading..."}
                <br />
                {deliveryFromDb.length > 0
                  ? deliveryFromDb[deliveryIndex].price + " :-"
                  : "loading..."}
                <hr />
                <h3>Betalning</h3>
                <p>
                  {
                    checkboxesPay.find((item) => item.paychecked === true)
                      ?.paymethod.title
                  }{" "}
                </p>
                <p>
                  Avgift
                  {" " +
                    checkboxesPay.find((item) => item.paychecked === true)
                      ?.paymethod.price}
                  :-{" "}
                </p>{" "}
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
                onClick={confirm}
                disabled={false}
                variant="contained"
                sx={{ width: "100%" }}
              >
                Slutför köp
              </Button>
            ) : (
              <Button
                onClick={confirm}
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
