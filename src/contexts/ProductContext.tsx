import { createContext, FC, useEffect, useState } from "react";
import { ProductBackend } from "../utils/backend";

interface ContextValue {
  products: ProductBackend[];
  handleAddProduct: (product: ProductBackend) => void;
  handleRemoveProduct: (product: ProductBackend) => void;
}

export const ProductContext = createContext<ContextValue>({
  products: [],
  handleAddProduct: (product: ProductBackend) => [],
  handleRemoveProduct: (product: ProductBackend) => [],
});

const ProductProvider: FC = (props) => {
  let productLS = JSON.parse(localStorage.getItem("ProductsLS")!);
  const [products, setProducts] = useState<ProductBackend[]>([]);

  useEffect(() => {
    localStorage.setItem("ProductsLS", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product: ProductBackend) => {
    const productExists = products.find((item) => item._id === product._id);
    // If the product already exist we won't add it to the array again,
    // we will just change its values
    if (productExists) {
      setProducts(
        products.map((item) =>
          item._id === product._id ? { ...product } : item
        )
      );
    } else {
      setProducts([...products, product]);
    }
  };

  const handleRemoveProduct = (product: ProductBackend) => {
    setProducts(products.filter(({ _id }) => _id !== product._id));
  };

  return (
    <ProductContext.Provider
      value={{ products, handleAddProduct, handleRemoveProduct }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
