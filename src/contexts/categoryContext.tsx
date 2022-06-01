import { createContext, FC, useContext, useState } from "react";

export interface ContextValue {}

export const categoryContext = createContext<ContextValue>({});

const CategoryProvider: FC = (props) => {
  const [category, setCategory] = useState(false);

  return (
    <categoryContext.Provider value={{}}>
      {props.children}
    </categoryContext.Provider>
  );
};

export default CategoryProvider;
