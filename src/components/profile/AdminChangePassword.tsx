import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import "./CSS/ChangeForms.css";
import { User } from "./AllUsersView";

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
  newPassword: yup.string().required("Password is required"),
});

function AdminChangePassword(props: User) {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const token = localStorage.getItem("loginToken");
      if (!token) return;

      let headers: RequestInit = {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      };
      fetch(`http://localhost:3000/api/user/password/${props._id}`, headers)
        .then((res: Response) => {
          if (res.status === 500) {
            return Promise.reject("Internal server error");
          } else if (res.status === 400) {
            return Promise.reject("newPassword required");
          }

          return res.json();
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
          <Button color="warning" variant="contained" type="submit">
            Byt Lösenord
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default AdminChangePassword;
