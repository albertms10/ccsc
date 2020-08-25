import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";

type LinkButtonProps = ButtonProps;

const LinkButton: React.FC<LinkButtonProps> = (props) => (
  <Button {...props} type="link" style={{ padding: 0, height: "auto" }} />
);

export default LinkButton;
