import { Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";

export interface CardInfo {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface Props {
  submitPaymentInfo: (info: CardInfo) => void;
  nextPanel: () => void;
}

export function CardPayment(props: Props) {
  const validationSchema = Yup.object().shape({
    cardHolder: Yup.string().required("Förnamn är obligatoriskt"),
    cardNumber: Yup.string()
      .required("Kortnummer är obligatoriskt")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(16, "Kortnummret är inte giltigt")
      .max(16, "Kortnummret är inte giltigt"),
    expiryDate: Yup.string()
      .required("Giltigt till är obligatoriskt")
      .min(5, "Giltigt till ska vara i xx/xxxx eller xx/xx")
      .max(7, "Giltigt till ska vara i xx/xxxx eller xx/xx"),
    cvc: Yup.string()
      .required("CVC är obligatoriskt")
      .min(3, "CVC är inte giltigt")
      .max(3, "CVC är inte giltigt"),
  });

  const initialValues: CardInfo = {
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(info, actions) => {
        props.submitPaymentInfo(info);
        actions.setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <Field
          component={TextField}
          name="cardHolder"
          type="text"
          label="Fullt namn"
          margin="dense"
        />
        <br />
        <Field
          component={TextField}
          name="cardNumber"
          type="tel"
          label="Kortnummer"
          margin="dense"
        />
        <br />
        <Field
          component={TextField}
          name="expiryDate"
          type="expiryDate"
          label="Giltigt till"
          margin="dense"
        />

        <br />
        <Field
          component={TextField}
          name="cvc"
          type="cvc"
          label="CVC"
          margin="dense"
        />
        <br />
        <Button type="submit" onClick={() => props.nextPanel()}>
          Bekräfta
        </Button>
      </Form>
    </Formik>
  );
}
