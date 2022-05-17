import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { PersonalData } from "../interfaces/interfaces";
import "./CheckOutPage.css";

interface Props {
  sendPersonalData: (data: PersonalData) => void;
}

export default function Shipping(props: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [zip, setZip] = useState("");
  const [adress, setAdress] = useState("");

  const initialErrors = {
    email: false,
    name: false,
    phonenumber: false,
    zip: false,
    adress: false,
  };
  const [errorInput, setErrorinput] = useState(initialErrors);

  /**This function makes sure ro re-renders the website each time these values are changed
   * The eslint-disable is used in order to not have to use the props.sendPersonalData as a
   * dependency, which would cause a never-ending loop.
   */
  useEffect(() => {
    props.sendPersonalData({
      email: email,
      name: name,
      phone: phonenumber,
      postnr: zip,
      street: adress,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, name, phonenumber, zip, adress]);

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (evt.target.name === "email") {
      if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          evt.target.value
        )
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
    }

    if (evt.target.name === "name") {
      if (
        !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
          evt.target.value
        )
      ) {
        setErrorinput({
          ...errorInput,
          [evt.target.name]: true,
        });
      } else {
        setName(evt.target.value);

        setErrorinput({
          ...errorInput,
          [evt.target.name]: false,
        });
      }
    }

    if (evt.target.name === "phonenumber") {
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
    }

    if (evt.target.name === "zip") {
      if (!/^\d{5,5}$/gm.test(evt.target.value)) {
        setErrorinput({
          ...errorInput,
          [evt.target.name]: true,
        });
      } else {
        setZip(evt.target.value);
        setErrorinput({
          ...errorInput,
          [evt.target.name]: false,
        });
      }
    }
    if (evt.target.name === "address-line1") {
      if (!/[^A-Za-z0-9]+/.test(evt.target.value)) {
        setErrorinput({
          ...errorInput,
          adress: true,
        });
      } else {
        setAdress(evt.target.value);

        setErrorinput({
          ...errorInput,
          adress: false,
        });
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <div>
        <div className="form-container">
          <div>
            <TextField
              className="box-1-input"
              type="email"
              name="email"
              label="Email"
              required
              helperText={
                errorInput.email ? "Ange gilig email-adress" : "Email-adress"
              }
              error={Boolean(errorInput.email)}
              onChange={handleChange}
            />
            <TextField
              name="name"
              label="Fullständigt namn"
              required
              helperText={
                errorInput.name ? "Ange giltigt namn" : "För- och efternamn"
              }
              error={Boolean(errorInput.name)}
              onChange={handleChange}
            />

            <TextField
              name="phonenumber"
              label="Telefonnummer"
              required
              helperText={
                errorInput.phonenumber
                  ? "Ange giltigt telefonnummer"
                  : "Telefonnummer"
              }
              error={Boolean(errorInput.phonenumber)}
              onChange={handleChange}
            />
          </div>
          <TextField
            className="box-1-input"
            name="zip"
            label="Postnummer"
            required
            helperText={
              errorInput.zip ? "Ange giltigt postnummer" : "Ange postnummer"
            }
            error={Boolean(errorInput.zip)}
            onChange={handleChange}
          />
          <TextField
            name="address-line1"
            label="Leveransadress"
            required
            error={Boolean(errorInput.adress)}
            onChange={handleChange}
            helperText={
              errorInput.adress ? "Ange giltig adress" : "Leveransadress"
            }
          />
        </div>
      </div>
    </Box>
  );
}
