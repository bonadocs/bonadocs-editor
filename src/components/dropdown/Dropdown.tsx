import React, { ChangeEvent, useRef } from "react";

import { Option } from "@/data/dataTypes";

interface DropdownProps {
  options: Option[];
  updateId: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedValue?: number | undefined | string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  updateId,
  selectedValue,
  className,
}) => {
  const selectedIndex =
    options.findIndex((option) => option.value === selectedValue) || 0;
  const displayOptions = useRef<Option[]>(options);

  return (
    <select
      className={`bonadocs__editor__dashboard__playground__dropdown ${className}`}
      onChange={(event) => {
        updateId(event);
      }}
    >
      {displayOptions.current.map((option, i) => (
        <option
          key={option.value}
          value={option.value}
          {...(i === selectedIndex ? { selected: true } : {})}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
