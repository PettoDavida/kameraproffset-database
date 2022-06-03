import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Button,
  ButtonGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { TextField, Checkbox } from "formik-mui";
import { useEffect, useState } from "react";
import {
  CategoryBackend,
  ProductBackend,
  ProductData,
  uploadMultipleImages,
  getImageUrl,
  getCategoriesFromBackend,
  updateProduct,
} from "../../utils/backend";

interface Props {
  product: ProductBackend;
  close: () => void;
}

const yupValidate = Yup.object().shape({
  title: Yup.string().required("Produkten måste ha ett namn"),
  price: Yup.number()
    .min(1, "Produkten får inte kosta mindre än 0 kr")
    .max(9999, "Produkten får inte kosta mer än 9999 kr")
    .required("Produkten måste ha ett pris i kronor"),
  stock: Yup.number()
    .min(1, "Produkten måste ha ett lagersaldo högre än 0")
    .required("Produkten måste ha ett lagersaldo"),
  longInfo: Yup.string().required("Produkten måste ha en beskrivning"),
  images: Yup.array(Yup.string())
    .min(1, "Bild din motherfucker")
    .required("Fuck off"),
  infos: Yup.array(Yup.string()).min(1, "Test").required("Infos Fuck off"),
  specs: Yup.array(
    Yup.object().shape({
      spectitle: Yup.string().required(),
      spec: Yup.string().required(),
    })
  ).min(1, "Test"),
});

export default function EditProductForm(props: Props) {
  const [categories, setCategories] = useState<CategoryBackend[]>([]);

  let product = props.product;

  const sendProductToBackend = (data: ProductData) => {
    const token = localStorage.getItem("loginToken");
    if (!token) return;

    updateProduct(product._id, data)
      .then((res) => {
        if (res.status === 404) {
          return Promise.reject("Product dosen't not exist");
        }

        props.close();
      })
      .catch((err) => {
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

  for (
    let productCategoryIndex = 0;
    productCategoryIndex < product.category.length;
    productCategoryIndex++
  ) {
    for (
      let categoryIndex = 0;
      categoryIndex < categories.length;
      categoryIndex++
    ) {
      if (
        product.category[productCategoryIndex] === categories[categoryIndex]._id
      ) {
        initCategories[categoryIndex] = true;
      }
    }
  }

  const initialValues: any = {
    title: product.title,
    price: product.price,
    images: product.images,
    longInfo: product.longInfo,
    infos: product.info,
    specs: product.specs,
    categories: initCategories,
    stock: product.stock,
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

          if (categoryIds.length <= 0) {
            actions.setErrors({ categories: "Välj minst en kategori" });
            actions.setSubmitting(false);
            return;
          }

          let product: ProductData = {
            title: values.title,
            price: values.price,
            images: values.images,
            longInfo: values.longInfo,
            info: values.infos,
            category: categoryIds,
            specs: values.specs,
            stock: values.stock,
          };

          sendProductToBackend(product);
        }}
        validationSchema={yupValidate}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Field
              component={TextField}
              name="title"
              type="title"
              label="Titel"
              margin="dense"
            />
            <Field
              component={TextField}
              name="price"
              type="price"
              label="Pris"
              margin="dense"
            />

            <Field
              component={TextField}
              multiline
              name="longInfo"
              type="longInfo"
              label="Lång Info"
              margin="dense"
            />
            <Field
              component={TextField}
              multiline
              name="stock"
              type="stock"
              label="Lager saldo"
              margin="dense"
            />
            <div>
              <Typography>Kategorier</Typography>
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
                              setFieldValue(
                                `categories.${i}`,
                                e.target.checked
                              );
                            }}
                          />
                        }
                        label={category.title}
                      />
                    );
                  })
                }
              </FieldArray>
            </div>
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
                      label={`Info ${i + 1}`}
                      margin="dense"
                    />
                  );
                })
              }
            </FieldArray>
            <FieldArray name="specs">
              {() =>
                values.specs.map((spec: string, i: number) => {
                  return (
                    <div key={i}>
                      <Field
                        component={TextField}
                        multiline
                        name={`specs.${i}.spectitle`}
                        type={`specs.${i}.spectitle`}
                        label={`Spec Titel ${i + 1}`}
                        margin="dense"
                      />
                      <Field
                        component={TextField}
                        multiline
                        name={`specs.${i}.spec`}
                        type={`specs.${i}.spec`}
                        label={`Spec Info ${i + 1}`}
                        margin="dense"
                      />
                    </div>
                  );
                })
              }
            </FieldArray>
            <FieldArray name="oldImages">
              {() =>
                values.images.map((imageId: string, i: number) => {
                  return (
                    <div key={i}>
                      <Typography>{`Bild ${i + 1}`}</Typography>
                      <img
                        src={getImageUrl(imageId)}
                        alt="productImage"
                        width="200px"
                      />
                      <Button
                        onClick={() => {
                          let index = values.images.indexOf(imageId);
                          let images = values.images;
                          images.splice(index, 1);

                          setFieldValue("images", images);

                          // TODO: Maybe some day, maybe not
                          // removeImage(imageId);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })
              }
            </FieldArray>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-file-picker"
              multiple
              type="file"
              onChange={(event) => {
                let files = event.currentTarget.files!;
                uploadMultipleImages(files)
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
            <br />
            <ButtonGroup>
              <Button
                variant="outlined"
                onClick={() => {
                  let infos = values.infos;
                  infos.push("");
                  setFieldValue("infos", infos);
                }}
              >
                Add Info
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  let infos = values.infos;
                  infos.pop();
                  setFieldValue("infos", infos);
                }}
              >
                Remove Info
              </Button>
            </ButtonGroup>
            <br />
            <br />
            <ButtonGroup>
              <Button
                variant="outlined"
                onClick={() => {
                  let specs = values.specs;
                  specs.push("");
                  setFieldValue("specs", specs);
                }}
              >
                Add Spec
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  let specs = values.specs;
                  specs.pop();
                  setFieldValue("specs", specs);
                }}
              >
                Remove Spec
              </Button>
            </ButtonGroup>
            <br />
            <br />
            <label htmlFor="image-file-picker">
              <Button variant="outlined" component="span">
                Upload new image
              </Button>
            </label>
            <br />
            <br />
            {values.images.length > 0 ? (
              <Button disabled={false} variant="outlined" type="submit">
                Submit
              </Button>
            ) : (
              <Button disabled={true} variant="outlined" type="submit">
                Submit
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
