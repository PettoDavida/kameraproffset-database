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
  oldEmail: yup.string().required("oldEmail is required"),
  newEmail: yup.string().required("Email is required"),
});

function ChangeEmail() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      oldEmail: "",
      newEmail: "",
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
      fetch(`http://localhost:3000/api/user/email/${tokenData.id}`, headers)
        .then((res: Response) => {
          if (res.status === 500) {
            return Promise.reject("Internal server error");
          } else if (res.status === 400) {
            return Promise.reject("oldEmail and newEmail required");
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
            id="oldEmail"
            name="oldEmail"
            label="oldEmail"
            value={formik.values.oldEmail}
            onChange={formik.handleChange}
            error={formik.touched.oldEmail && Boolean(formik.errors.oldEmail)}
            helperText={formik.touched.oldEmail && formik.errors.oldEmail}
          />
          <TextField
            id="newEmail"
            name="newEmail"
            label="newEmail"
            type="newEmail"
            value={formik.values.newEmail}
            onChange={formik.handleChange}
            error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
            helperText={formik.touched.newEmail && formik.errors.newEmail}
          />
          <Button color="primary" variant="contained" type="submit">
            Byt Email
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default ChangeEmail;
