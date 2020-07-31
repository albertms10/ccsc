import { Entitat } from "model";
import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAPI } from "../../helpers";
import { MainLayout } from "./components/main-layout";
import { FormacionsContext, SiderContext } from "./contexts";

export const EntitatContext = createContext<Entitat>({} as Entitat);

export default () => {
  const [entitat] = useAPI<Entitat>("/entitats", {} as Entitat);

  return (
    <EntitatContext.Provider value={entitat}>
      <FormacionsContext>
        <SiderContext>
          <BrowserRouter basename="/tauler">
            <MainLayout />
          </BrowserRouter>
        </SiderContext>
      </FormacionsContext>
    </EntitatContext.Provider>
  );
};
