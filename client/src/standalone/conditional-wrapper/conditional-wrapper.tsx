import React from "react";

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
}

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => <>{condition ? wrapper(children) : children}</>;

export default ConditionalWrapper;
