import { Agrupacio } from "model";
import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAPI } from "../../helpers";
import { MainLayout } from "./components/main-layout";
import { FormacionsContext, SiderContext } from "./contexts";

export const AgrupacioContext = createContext<Agrupacio>({} as Agrupacio);

export default () => {
  const [agrupacio] = useAPI<Agrupacio>("/agrupacions", {} as Agrupacio);

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
