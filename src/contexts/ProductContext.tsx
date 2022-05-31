import { createContext, FC, useEffect, useState } from "react";
import { mockedProducts, Product } from "../interfaces/interfaces";

interface ContextValue {
  products: Product[];
  handleAddProduct: (product: Product) => void;
  handleRemoveProduct: (product: Product) => void;
}

export const ProductContext = createContext<ContextValue>({
  products: [],
  handleAddProduct: (product: Product) => [],
  handleRemoveProduct: (product: Product) => [],
});

const ProductProvider: FC = (props) => {
  let productLS = JSON.parse(localStorage.getItem("ProductsLS")!);
  const [products, setProducts] = useState<Product[]>(
    productLS ? productLS : mockedProducts
  );

  useEffect(() => {
    localStorage.setItem("ProductsLS", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product: Product) => {
    const productExists = products.find((item) => item.id === product.id);
    // If the product already exist we won't add it to the array again,
    // we will just change its values
    if (productExists) {
      setProducts(
        products.map((item) => (item.id === product.id ? { ...product } : item))
      );
    } else {
      setProducts([...products, product]);
    }
  };

  const handleRemoveProduct = (product: Product) => {
    setProducts(products.filter(({ id }) => id !== product.id));
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
