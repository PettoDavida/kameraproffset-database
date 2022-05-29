import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, FormControlLabel } from "@mui/material";
import { TextField, Checkbox } from "formik-mui";
import { useEffect, useState } from "react";
import { CategoryBackend, ProductData, uploadImage } from "../../utils/backend";

interface Props {
  close: () => void;
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

export async function getCategoriesFromBackend() {
  let headers: RequestInit = {
    method: "GET",
  };
  return fetch("http://localhost:3000/api/category", headers);
}

export default function NewProductForm(props: Props) {
  const [categories, setCategories] = useState<CategoryBackend[]>([]);
  const sendProductToBackend = (data: ProductData) => {
    const token = localStorage.getItem("loginToken");
    if (!token) return;

    let headers: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/api/products", headers)
      .then((res: Response) => {
        if (res.status === 400) {
          return Promise.reject("Bad");
        }

        props.close();
      })
      .catch((err) => {
        props.close();
        console.log(err);
      });
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

          let product: ProductData = {
            title: values.title,
            price: values.price,
            images: values.images,
            longInfo: values.longInfo,
            info: values.infos,
            category: categoryIds,
            stock: values.stock,
          };

          sendProductToBackend(product);
        }}

        // validationSchema={yupValidate}
      >
        {({ values, setFieldValue }) => (
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
                categories.map((category: CategoryBackend, i: number) => {
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
            <FieldArray name="oldImages">
              {() =>
                values.images.map((imageId: string, i: number) => {
                  return (
                    <div key={i}>
                      <img
                        src={`http://localhost:3000/api/media/${imageId}`}
                        alt="productImage"
                        width="200px"
                      />
                      <Button>Delete</Button>
                    </div>
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
                let imageHandles = [];
                let files = event.currentTarget.files!;
                for (let i = 0; i < files.length; i++) {
                  const file = files[i];
                  let image = uploadImage(file);
                  imageHandles.push(image);
                }

                Promise.all(imageHandles)
                  .then((data) => {
                    let array = [];
                    for (let i = 0; i < data.length; i++) {
                      array.push(data[i].json());
                    }
                    Promise.all(array)
                      .then((newImageObjs) => {
                        let images = values.images;
                        for (let i = 0; i < newImageObjs.length; i++) {
                          images.push(newImageObjs[i]._id);
                        }
                        setFieldValue("images", images);
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
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
