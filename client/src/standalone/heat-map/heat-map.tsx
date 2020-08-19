import { Spin } from "antd";
import React from "react";
import {
  HeatMapNumbers,
  HeatMapNumbersProps,
} from "./components/heat-map-numbers";
import {
  HeatMapSections,
  HeatMapSectionsProps,
} from "./components/heat-map-sections";

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
