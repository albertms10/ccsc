import React from "react";
import "./sub-header.css";

interface SubHeaderProps {
  title?: string;
  style?: React.CSSProperties;
}

const SubHeader: React.FC<SubHeaderProps> = ({ title, style }) => (
  <div className="sub-header" style={style}>
    {title}
  </div>
);

export default SubHeader;
