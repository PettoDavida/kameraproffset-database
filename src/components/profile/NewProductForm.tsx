import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import { Button, MenuItem } from "@mui/material";
import { Select, TextField } from "formik-mui";
import { display } from "@mui/system";

interface Product {
  title: String;
  price: Number;
}

// const yupValidate = Yup.object().shape({
//   productName: Yup.string().required("Produkten måste ha ett namn"),
//   productImage: Yup.string().required("Produkten måste ha en bild i URL form"),
//   productPrice: Yup.number()
//     .min(1, "Produkten får inte kosta mindre än 0 kr")
//     .max(9999, "Produkten får inte kosta mer än 9999 kr")
//     .required("Produkten måste ha ett pris i kronor"),
//   productAbout: Yup.string().required("Produkten måste ha en beskrivning"),
// });

export default function NewProductForm(props: any) {
  const addProduct = (values: any) => {};

  const initialValues: any = {
    title: "",
    images: [],
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          let array = [];
          for (let i = 0; i < values.images.length; i++) {
            let uploadImg = uploadImage(values.images[i]);
            array.push(uploadImg);
          }
          Promise.all(array).then((data) => {
            let array = [];
            for (let i = 0; i < data.length; i++) {
              array.push(data[i].json());
            }
            Promise.all(array).then((data) => {
              let array = [];
              for (let i = 0; i < data.length; i++) {
                array.push(data[i]._id);
              }
              console.log(array);
            });
          });
        }}

        // validationSchema={yupValidate}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field
              component={TextField}
              name="title"
              type="title"
              label="Title"
              margin="dense"
            />
            <Field
              component={TextField}
              name="price"
              type="price"
              label="Price"
              margin="dense"
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(event) => {
                let images = [];
                let files = event.currentTarget.files!;
                for (let i = 0; i < files.length; i++) {
                  const element = files[i];
                  images.push(element);
                  console.log(element);
                }
                props.setFieldValue("images", images);
              }}
            />
            <label htmlFor="raised-button-file">
              <Button component="span">Upload</Button>
            </label>
            <Field
              component={TextField}
              multiline
              name="longInfo"
              type="longInfo"
              label="longInfo"
              margin="dense"
            />
            <Field
              component={TextField}
              multiline
              name="productAbout"
              type="productAbout"
              label="About"
              margin="dense"
            />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function uploadImage(image: File) {
  var formData = new FormData();
  formData.append("media", image, image.name);
  let headers: RequestInit = {
    method: "POST",
    body: formData,
  };
  return fetch("http://localhost:3000/api/media", headers);
}
