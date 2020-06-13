import React, { createContext } from "react";
import { useFormacions } from "../hooks";

export const FormacionsListContext = createContext(null);
export const LoadingFormacionsContext = createContext(null);

export default ({ children }) => {
  const [formacions, loadingFormacions] = useFormacions();

  return (
    <FormacionsListContext.Provider value={formacions}>
      <LoadingFormacionsContext.Provider value={loadingFormacions}>
        {children}
      </LoadingFormacionsContext.Provider>
    </FormacionsListContext.Provider>
  );
};
