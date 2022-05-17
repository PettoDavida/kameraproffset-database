/* eslint-disable react/jsx-no-comment-textnodes */
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Button,
  Card,
  CardActions,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import {
  mockedPay,
  mockedShipping,
  PaySelection,
  PersonalData,
  ShipperSelection,
} from "../interfaces/interfaces";
import CardPayment from "./CardPayment";
import "./checkOutAccordion.css";
import FakturaPayment from "./FakturaPayment";
import { useUser } from "../contexts/confirmationContext";
import Shipping from "./Shipping";
import SwishPayment from "./SwishPayment";

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

  const defaultShipperState: ShipperSelection[] = mockedShipping.map(
    (shipper) => ({ shipper, checked: false })
  );

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [checkboxes, setCheckboxes] =
    React.useState<ShipperSelection[]>(defaultShipperState);

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
          <Typography component={"div"} className="DeliveryForm">
            {checkboxes.map((checkbox) => (
              <div key={checkbox.shipper.id}>
                <FormGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "1rem 0",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          let checkboxListToUpdate = checkboxes;

                          checkboxListToUpdate.forEach((tempCheckbox) => {
                            tempCheckbox.checked = false;
                          });

                          const currentBoxIndex = mockedShipping.findIndex(
                            (item) => item.id === checkbox.shipper.id
                          );

                          checkboxListToUpdate[currentBoxIndex].checked = true;

                          setCheckboxes([...checkboxListToUpdate]);
                        }}
                        checked={checkbox.checked}
                      />
                    }
                    label={
                      <img
                        className="shipper-img"
                        src={checkbox.shipper.image}
                        alt=""
                      />
                    }
                  />

                  <div className="info" key={checkbox.shipper.id}>
                    <p>{checkbox.shipper.price}:-</p>
                    <p>{checkbox.shipper.info}</p>
                  </div>
                </FormGroup>
              </div>
            ))}
          </Typography>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            disabled={
              checkboxes.find((item) => item.checked === true) ? false : true
            }
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
                {/* {checkboxes.map((checked) => (<div>{checked.findIndex() === true}</div>))} */}
                <p>
                  {
                    checkboxes.find((item) => item.checked === true)?.shipper
                      .title
                  }{" "}
                </p>
                <p>
                  {
                    checkboxes.find((item) => item.checked === true)?.shipper
                      .info
                  }
                </p>{" "}
                <p>
                  Fraktkostnad:
                  {" " +
                    checkboxes.find((item) => item.checked === true)?.shipper
                      .price}
                  :-
                </p>{" "}
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

                {cartItems.map((item) => (
                  <div className="product-checkout-container" key={item.id}>
                    <Card className="product-checkout-width">
                      <h1>{item.title}</h1>
                      <div className="image-checkout-container">
                        <img src={item.image} alt="" />

                        <CardActions>
                          <Typography>{item.quantity} st</Typography>
                        </CardActions>
                        <Typography>{item.quantity * item.price}:- </Typography>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              <hr />
              Totalpris:{" "}
              {totalCost +
                checkboxesPay.find((item) => item.paychecked === true)
                  ?.paymethod.price! +
                checkboxes.find((item) => item.checked === true)?.shipper
                  .price!}{" "}
              kr
              <div>Moms: {totalCost * 0.25} kr</div>
            </div>
            <br />
            {/* If shipping and payment has not been choosen, the button is disabled. If they have been choosen
            the button will not be disabled and the "Link-to" will work. */}
            {checkboxes.find((item) => item.checked === true) &&
            checkboxesPay.find((item) => item.paychecked === true) ? (
              <Link to={`/ConfirmationPage/${personalInfo.name}`}>
                <Button
                  onClick={confirm}
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  Slutför köp
                </Button>
              </Link>
            ) : (
              <Button
                disabled={true}
                onClick={confirm}
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
