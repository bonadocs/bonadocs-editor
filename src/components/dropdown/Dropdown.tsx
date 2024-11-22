import React, { ChangeEvent, useRef, useEffect, useState } from "react";

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

  return (
    <select
      className={`bonadocs__editor__dashboard__playground__dropdown ${className}`}
      onChange={(event) => {
        updateId(event);
      }}
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
