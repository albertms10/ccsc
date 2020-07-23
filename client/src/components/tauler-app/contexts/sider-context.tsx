import React, { createContext, useState } from "react";

export const SiderBrokenContext = createContext(false);
export const SiderSetBrokenContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>((_) => {});
export const SiderCollapsedContext = createContext(false);
export const SiderSetCollapsedContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>((_) => {});

const SiderContext: React.FC = ({ children }) => {
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

export default SiderContext;
