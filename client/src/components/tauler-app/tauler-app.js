import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/main-layout";
import { FormacionsContext, SiderContext } from "./contexts";
import { useAssociacio } from "./hooks";

export const AssociacioContext = createContext({});

export default () => {
  const [associacio] = useAssociacio();

  return (
    <AssociacioContext.Provider value={associacio}>
      <FormacionsContext>
        <SiderContext>
          <BrowserRouter basename="/tauler">
            <MainLayout />
          </BrowserRouter>
        </SiderContext>
      </FormacionsContext>
    </AssociacioContext.Provider>
  );
};
