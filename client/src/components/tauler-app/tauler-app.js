import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/main-layout";
import { AgrupacionsContext, SiderContext } from "./contexts";
import { useAssociacio } from "./hooks";

export const AssociacioContext = createContext({});

export default () => {
  const [associacio] = useAssociacio();

  return (
    <AssociacioContext.Provider value={associacio}>
      <AgrupacionsContext>
        <SiderContext>
          <BrowserRouter basename="/tauler">
            <MainLayout />
          </BrowserRouter>
        </SiderContext>
      </AgrupacionsContext>
    </AssociacioContext.Provider>
  );
};
