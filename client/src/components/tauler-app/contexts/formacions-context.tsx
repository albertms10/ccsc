import { Formacio, Usuari } from "model";
import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { useAPI } from "../../../helpers";
import { RootState } from "../../../store/types";

export const FormacionsListContext = createContext<Formacio[]>([]);
export const LoadingFormacionsContext = createContext(false);

const FormacionsContext: React.FC = ({ children }) => {
  const { id_persona } = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  const [formacions, loadingFormacions] = useAPI<Formacio[]>(
    `/socis/${id_persona}/formacions`,
    []
  );

  return (
    <FormacionsListContext.Provider value={formacions}>
      <LoadingFormacionsContext.Provider value={loadingFormacions}>
        {children}
      </LoadingFormacionsContext.Provider>
    </FormacionsListContext.Provider>
  );
};

export default FormacionsContext;
