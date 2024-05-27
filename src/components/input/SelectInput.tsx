import React from "react";

import { Option } from "@/data/dataTypes";

type SelectInputProps = {
  options: Option[];
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedValue?: string;
  className?: string;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  handleInputChange,
  selectedValue,
  className,
}) => {
  const selectedIndex =
    options.findIndex((option) => option.value === selectedValue) || 0;
  return (
    <select
      className={`bonadocs__editor__param__select ${className}`}
      onChange={handleInputChange}
    >
      {options.map((option, i) => (
        <option
          key={i}
          value={option.value}
          {...(i === selectedIndex ? { selected: true } : {})}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
