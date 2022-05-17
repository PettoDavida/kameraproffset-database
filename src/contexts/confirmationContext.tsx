import { createContext, FC, useContext, useState } from "react";
import { confirmationFetch } from "../components/confirmationFetch";
import { ShoppingCartContext } from "./ShoppingCartContext";

export interface ContextValue {
  isLoading: boolean;
  confirm: () => void;
}

export const ConfirmationContext = createContext<ContextValue>({
  isLoading: false,
  confirm: () => {},
});

const ConfirmationProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { emptyCart } = useContext(ShoppingCartContext);

  const confirm = async () => {
    setIsLoading(true);
    await confirmationFetch("api/confirm");
    emptyCart();
    setIsLoading(false);
  };

  return (
    <ConfirmationContext.Provider value={{ isLoading, confirm }}>
      {props.children}
    </ConfirmationContext.Provider>
  );
};

export default ConfirmationProvider;

export const useUser = () => useContext(ConfirmationContext);
