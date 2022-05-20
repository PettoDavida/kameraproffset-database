import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import "../CSS/CheckOutPage.css";

interface Props {
  email: string;
  triggerNextAccordion(): void;
}

export default function FakturaPayment(props: Props) {
  const [errorInput, setErrorinput] = useState({ email: false });
  const [email, setEmail] = useState(props.email);

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(evt.target.value)
    ) {
      setErrorinput({
        ...errorInput,
        [evt.target.name]: true,
      });
    } else {
      setEmail(evt.target.value);

      setErrorinput({
        ...errorInput,
        [evt.target.name]: false,
      });
    }
  };

  function isEmailFilled() {
    if (email.length >= 5 && errorInput.email === false) {
      return false;
    } else return true;
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <div className="form-container">
        <div className="box-1">
          <TextField
            name="email"
            label="Mailadress"
            required
            defaultValue={props.email}
            helperText={
              errorInput.email ? "Ange giltig mailadress" : "Mailadress"
            }
            error={Boolean(errorInput.email)}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            disabled={Boolean(isEmailFilled())}
            onClick={() => props.triggerNextAccordion()}
            sx={{ width: "100%" }}
          >
            Bekräfta
          </Button>
        </div>
      </div>
    </Box>
  );
}
