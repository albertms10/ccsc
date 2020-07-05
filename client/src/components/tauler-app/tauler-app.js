import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAPI } from "../../helpers";
import { MainLayout } from "./components/main-layout";
import { FormacionsContext, SiderContext } from "./contexts";

export const AgrupacioContext = createContext({});

export default () => {
  const [agrupacio] = useAPI("/api/agrupacions");

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
