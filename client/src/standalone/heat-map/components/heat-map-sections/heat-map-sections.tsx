import { Tooltip } from "antd";
import React from "react";
import { StyledComponent } from "react-types";
import "./heat-map-sections.css";

export interface HeatMapSection {
  name: string;
  weight: number;
}

export interface HeatMapSectionsProps extends StyledComponent {
  sections?: HeatMapSection[];
}

const HeatMapSections: React.FC<HeatMapSectionsProps> = ({
  sections = [],
  style,
}) => (
  <div style={{ display: "flex", height: 7, ...style }}>
    {sections.map((section, index) => (
      <Tooltip key={`heatmap-sections-${index + 1}`} title={section.name}>
        <div
          className={"heat-map-section" + (!section.name ? " disabled" : "")}
          style={{
            flex: section.weight,
            ...(index < sections.length - 1 && {
              borderRight: "2px solid #aaa",
            }),
          }}
        />
      </Tooltip>
    ))}
  </div>
);

export default HeatMapSections;
