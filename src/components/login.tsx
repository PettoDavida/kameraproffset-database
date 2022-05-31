import {
  Button,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import "../CSS/SignUp.css";
import { Link, useNavigate } from "react-router-dom";

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
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

function LogInPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let headers: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      fetch("http://localhost:3000/api/user/login", headers)
        .then((res: Response) => {
          if (res.status === 403) {
            return Promise.reject("Email or Password incorrect");
          } else if (res.status === 500) {
            return Promise.reject("Internal server error");
          } else if (res.status === 400) {
            return Promise.reject("Email and Password required");
          }

          return res.json();
        })
        .then((data) => {
          localStorage.setItem("loginToken", data.token);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="signUpFormContainer">
        <form className="signUpForm" onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
        </form>
        <br />
        <div className="center">
          <Typography>
            Don't have an account? <Link to="/SignUp">Register here</Link>
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LogInPage;
