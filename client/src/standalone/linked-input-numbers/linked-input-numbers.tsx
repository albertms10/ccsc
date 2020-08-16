import { InputNumber, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

interface LinkedInputNumbersProps {
  values: (number | null)[];
  placeholders?: string[];
  min?: number;
  max: number;
}

// TODO: Implementar l’enllaç de mín/màx entre inputs
const LinkedInputNumbers: React.FC<LinkedInputNumbersProps> = ({
  values,
  placeholders = [],
  min = 1,
  max,
}) => {
  const { t } = useTranslation();

  return (
    <Space size="large">
      {values.map((value, index) => (
        <InputNumber
          key={`input-number-${value}-${index}`}
          defaultValue={value || undefined}
          precision={0}
          min={min}
          max={max}
          placeholder={t(placeholders[index])}
        />
      ))}
    </Space>
  );
};

export default LinkedInputNumbers;
