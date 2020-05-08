import React, { createContext, useState } from "react";

export const SiderBrokenContext = createContext(null);
export const SiderSetBrokenContext = createContext((_) => {});
export const SiderCollapsedContext = createContext(null);
export const SiderSetCollapsedContext = createContext((_) => {});

export default ({ children }) => {
  const [broken, setBroken] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SiderBrokenContext.Provider value={broken}>
      <SiderSetBrokenContext.Provider value={setBroken}>
        <SiderCollapsedContext.Provider value={collapsed}>
          <SiderSetCollapsedContext.Provider value={setCollapsed}>
            {children}
          </SiderSetCollapsedContext.Provider>
        </SiderCollapsedContext.Provider>
      </SiderSetBrokenContext.Provider>
    </SiderBrokenContext.Provider>
  );
};
