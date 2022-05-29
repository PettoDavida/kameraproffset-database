import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./CSS/ChangeForms.css";
import { getTokenData } from "../../utils/token";

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
          localStorage.removeItem("loginToken");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="changeContainer">
      <form className="changeForm" onSubmit={formik.handleSubmit}>
        <TextField
          className="textField"
          id="oldEmail"
          name="oldEmail"
          label="oldEmail"
          value={formik.values.oldEmail}
          onChange={formik.handleChange}
          error={formik.touched.oldEmail && Boolean(formik.errors.oldEmail)}
          helperText={formik.touched.oldEmail && formik.errors.oldEmail}
        />
        <TextField
          className="textField"
          id="newEmail"
          name="newEmail"
          label="newEmail"
          type="newEmail"
          value={formik.values.newEmail}
          onChange={formik.handleChange}
          error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
          helperText={formik.touched.newEmail && formik.errors.newEmail}
        />
        <Button variant="contained" type="submit">
          Byt Email
        </Button>
      </form>
    </div>
  );
}

export default ChangeEmail;
