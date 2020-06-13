import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/main-layout";
import { FormacionsContext, SiderContext } from "./contexts";
import { useAgrupacio } from "./hooks";

export const AgrupacioContext = createContext({});

export default () => {
  const [agrupacio] = useAgrupacio();

  return (
    <AgrupacioContext.Provider value={agrupacio}>
      <FormacionsContext>
        <SiderContext>
          <BrowserRouter basename="/tauler">
            <MainLayout />
          </BrowserRouter>
        </SiderContext>
      </FormacionsContext>
    </AgrupacioContext.Provider>
  );
};
