import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { useAPI } from "../../../helpers";

export const FormacionsListContext = createContext(null);
export const LoadingFormacionsContext = createContext(null);

export default ({ children }) => {
  const { id_persona } = useSelector((state) => state.user.currentUser);
  const [formacions, loadingFormacions] = useAPI(
    `/api/socis/${id_persona}/formacions`
  );

  return (
    <FormacionsListContext.Provider value={formacions}>
      <LoadingFormacionsContext.Provider value={loadingFormacions}>
        {children}
      </LoadingFormacionsContext.Provider>
    </FormacionsListContext.Provider>
  );
};
