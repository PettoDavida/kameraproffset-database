import { Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";

export interface FakturaInfo {}

interface Props {
  email: String;
  submitPaymentInfo: (info: FakturaInfo) => void;
  nextPanel: () => void;
}

export function FakturaPayment(props: Props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email är obligatoriskt")
      .email("Formatet på email är fel"),
  });

  const initialValue = {
    email: props.email,
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
        <Field
          component={TextField}
          name="email"
          type="email"
          label="E-mail"
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
