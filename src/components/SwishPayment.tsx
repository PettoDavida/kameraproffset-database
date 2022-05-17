import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Props {
  telnumber: string;
  triggerNextAccordion(): void;
}

export default function SwishPayment(props: Props) {
  const [errorInput, setErrorinput] = useState({ phonenumber: false });
  const [phonenumber, setPhonenumber] = useState(props.telnumber);

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      !/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(
        evt.target.value
      )
    ) {
      setErrorinput({
        ...errorInput,
        [evt.target.name]: true,
      });
    } else {
      setPhonenumber(evt.target.value);

      setErrorinput({
        ...errorInput,
        [evt.target.name]: false,
      });
    }
  };

  function isNumberFilled() {
    if (
      phonenumber.toString().length >= 7 &&
      errorInput.phonenumber === false
    ) {
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
            name="phonenumber"
            label="Telefonnummer"
            required
            defaultValue={props.telnumber}
            helperText={
              errorInput.phonenumber
                ? "Ange giltigt telefonnummer"
                : "Telefonnummer"
            }
            error={Boolean(errorInput.phonenumber)}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            disabled={Boolean(isNumberFilled())}
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
