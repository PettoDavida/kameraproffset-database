import { createContext, FC, useContext, useState } from "react";
import { confirmationFetch } from "../components/confirmationFetch";
import { createOrder } from "../utils/backend";
import { ShoppingCartContext } from "./ShoppingCartContext";

export interface ContextValue {
  confirm: () => void;
}

export const ConfirmationContext = createContext<ContextValue>({
  confirm: () => {},
});

const ConfirmationProvider: FC = (props) => {
  const { emptyCart } = useContext(ShoppingCartContext);

  const confirm = async () => {
    // await createOrder();
    emptyCart();
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {props.children}
    </ConfirmationContext.Provider>
  );
};

export default ConfirmationProvider;

export const useUser = () => useContext(ConfirmationContext);
