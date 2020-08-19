import { Spin } from "antd";
import React from "react";
import { HeatMapNumbers } from "./components/heat-map-numbers";
import { HeatMapNumbersProps } from "./components/heat-map-numbers/heat-map-numbers";
import { HeatMapSections } from "./components/heat-map-sections";
import { HeatMapSectionsProps } from "./components/heat-map-sections/heat-map-sections";

interface HeatMapProps extends HeatMapSectionsProps, HeatMapNumbersProps {
  loading?: boolean;
}

const HeatMap: React.FC<HeatMapProps> = ({
  sections,
  numbers,
  loading = false,
}) => (
  <Spin spinning={loading}>
    <HeatMapSections sections={sections} />
    <HeatMapNumbers numbers={numbers} />
  </Spin>
);

export default HeatMap;
