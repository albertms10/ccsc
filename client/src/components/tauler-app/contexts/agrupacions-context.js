import React, { createContext } from "react";
import { useAgrupacions } from "../hooks";

export const AgrupacionsListContext = createContext(null);
export const LoadingAgrupacionsContext = createContext(null);

export default ({ children }) => {
  const [agrupacions, loadingAgrupacions] = useAgrupacions();

  return (
    <AgrupacionsListContext.Provider value={agrupacions}>
      <LoadingAgrupacionsContext.Provider value={loadingAgrupacions}>
        {children}
      </LoadingAgrupacionsContext.Provider>
    </AgrupacionsListContext.Provider>
  );
};
