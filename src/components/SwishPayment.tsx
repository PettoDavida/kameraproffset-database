import { Typography, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import SwishQRLogo from "../utils/SwishQR.png";
import "../CSS/SwishPayment.css";

export interface SwishInfo {
  phoneNumber: String;
}

interface Props {
  phoneNumber: String;
  submitPaymentInfo: (info: SwishInfo) => void;
  nextPanel: () => void;
}

export function SwishPayment(props: Props) {
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.number()
      .required("Telefonnummer är obligatoriskt")
      .typeError("Du får endast ange siffror i detta fältet"),
  });

  const initialValue = {
    phoneNumber: props.phoneNumber,
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(info, actions) => {
        props.submitPaymentInfo(info);
        actions.setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <img src={SwishQRLogo} alt="" className="swishQR" />
        <Typography>
          Scanna QR koden eller <br /> välj telefonnummer i rutan under
        </Typography>
        <br />
        <Field
          component={TextField}
          name="phoneNumber"
          type="tel"
          label="Nummer"
          margin="dense"
        />
        <br />
        <Button type="submit" onClick={() => props.nextPanel()}>
          Submit
        </Button>
      </Form>
    </Formik>
  );
}
