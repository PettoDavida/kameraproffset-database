import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, FormControlLabel } from "@mui/material";
import { TextField, Checkbox } from "formik-mui";
import { useEffect, useState } from "react";
import { getCategoriesFromBackend, uploadImage } from "./NewProductForm";

interface Product {
  title: String;
  price: Number;
  images: String[];
  longInfo: String;
  info: String[];
  category: String[];
  stock?: number;
}

interface Category {
  _id: string;
  title: string;
  description: string;
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

export default function EditProductForm(props: any) {
  const [categories, setCategories] = useState<Category[]>([]);
  const sendProductToBackend = (product: Product) => {
    // TODO: Send to backend
    console.log(product);
  };

  const updateCategories = async () => {
    let categories = await getCategoriesFromBackend();
    let data = await categories.json();
    setCategories(data);
  };

  useEffect(() => {
    updateCategories();
  }, []);

  let initCategories = [];
  for (let i = 0; i < categories.length; i++) {
    initCategories.push(false);
  }

  const initialValues: any = {
    title: "",
    price: 0,
    images: [],
    longInfo: "",
    infos: [""],
    categories: initCategories,
    stock: 0,
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          let categoryIds: string[] = [];
          for (let i = 0; i < values.categories.length; i++) {
            if (values.categories[i]) {
              categoryIds.push(categories[i]._id);
            }
          }

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
              let imageIds = [];
              for (let i = 0; i < data.length; i++) {
                imageIds.push(data[i]._id);
              }

              let product: Product = {
                title: values.title,
                price: values.price,
                images: imageIds,
                longInfo: values.longInfo,
                info: values.infos,
                category: categoryIds,
                stock: values.stock,
              };

              sendProductToBackend(product);
            });
          });
        }}

        // validationSchema={yupValidate}
      >
        {({ values, setFieldValue, resetForm }) => (
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
              name="stock"
              type="stock"
              label="Stock"
              margin="dense"
            />

            <FieldArray name="categories">
              {() =>
                categories.map((category: Category, i: number) => {
                  return (
                    <FormControlLabel
                      key={i}
                      control={
                        <Field
                          component={Checkbox}
                          type="checkbox"
                          name={`categories.${i}`}
                          margin="dense"
                          checked={values.categories[i] || false}
                          onChange={(e: any) => {
                            setFieldValue(`categories.${i}`, e.target.checked);
                          }}
                        />
                      }
                      label={category.title}
                    />
                  );
                })
              }
            </FieldArray>

            <FieldArray name="infos">
              {() =>
                values.infos.map((info: string, i: number) => {
                  return (
                    <Field
                      key={i}
                      component={TextField}
                      multiline
                      name={`infos.${i}`}
                      type={`infos.${i}`}
                      label="Info"
                      margin="dense"
                    />
                  );
                })
              }
            </FieldArray>
            <Button
              onClick={() => {
                let infos = values.infos;
                infos.push("");
                setFieldValue("infos", infos);
              }}
            >
              Add Info
            </Button>
            <Button
              onClick={() => {
                let infos = values.infos;
                infos.pop();
                setFieldValue("infos", infos);
              }}
            >
              Remove Info
            </Button>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-file-picker"
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

                setFieldValue("images", images);
              }}
            />
            <label htmlFor="image-file-picker">
              <Button component="span">Upload</Button>
            </label>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
