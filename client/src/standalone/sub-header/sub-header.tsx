import React from "react";
import "./sub-header.css";
import { StyledComponent } from "react-types";

interface SubHeaderProps extends StyledComponent {
  title?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ title, style }) => (
  <div className="sub-header" style={style}>
    {title}
  </div>
);

export default SubHeader;
