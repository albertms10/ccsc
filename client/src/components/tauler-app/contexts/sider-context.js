import React, { createContext, useState } from "react";

export const SiderBrokenContext = createContext(null);
export const SiderSetBrokenContext = createContext(null);
export const SiderCollapsedContext = createContext(null);
export const SiderSetCollapsedContext = createContext(null);

export default ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [broken, setBroken] = useState(false);

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
