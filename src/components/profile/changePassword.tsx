import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import getTokenData from "./GetIDFromToken";
import "./CSS/ChangeForms.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
      contrastText: "#FBF7F5", //button text white instead of black
    },
    background: {
      default: "#333333",
    },

    secondary: {
      main: "#DA344D",
    },
  },
});

const validationSchema = yup.object({
  oldPassword: yup.string().required("oldPassword is required"),
  newPassword: yup.string().required("Password is required"),
});

function ChangePassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const token = localStorage.getItem("loginToken");
      if (!token) return;

      const tokenData = getTokenData(token);

      let headers: RequestInit = {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      };
      fetch(`http://localhost:3000/api/user/password/${tokenData.id}`, headers)
        .then((res: Response) => {
          if (res.status === 500) {
            return Promise.reject("Internal server error");
          } else if (res.status === 400) {
            return Promise.reject("oldPassword and newPassword required");
          }

          return res.json();
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="changeContainer">
        <form className="changeForm" onSubmit={formik.handleSubmit}>
          <TextField
            id="oldPassword"
            name="oldPassword"
            label="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <TextField
            id="newPassword"
            name="newPassword"
            label="newPassword"
            type="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <Button color="primary" variant="contained" type="submit">
            Byt Lösenord
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default ChangePassword;
