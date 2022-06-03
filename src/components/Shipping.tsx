import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import "../CSS/CheckOutPage.css";
import { Address } from "../utils/backend";

interface Props {
  submitUserInfo: (data: Address) => void;
  nextPanel: () => void;
}

export default function Shipping(props: Props) {
  let initialValues: Address = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipcode: 0,
    phoneNumber: "",
  };

  return (
    <div className="form-container">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(data, actions) => {
          props.submitUserInfo(data);
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <Field
            component={TextField}
            name="firstName"
            type="firstName"
            label="Förnamn"
            margin="dense"
          />
          <Field
            component={TextField}
            name="lastName"
            type="lastName"
            label="Efternamn"
            margin="dense"
          />
          <Field
            component={TextField}
            name="street"
            type="street"
            label="Adress"
            margin="dense"
          />
          <Field
            component={TextField}
            name="city"
            type="city"
            label="Stad"
            margin="dense"
          />
          <Field
            component={TextField}
            name="zipcode"
            type="zipcode"
            label="Post nummer"
            margin="dense"
          />
          <Field
            component={TextField}
            name="phoneNumber"
            type="phoneNumber"
            label="Telefonnummer"
            margin="dense"
          />
          <Button
            type="submit"
            variant="contained"
            onClick={() => props.nextPanel()}
            size="medium"
            sx={{ width: "100%" }}
          >
            Bekräfta
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
