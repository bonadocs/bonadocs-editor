import { Option } from "@/data/dataTypes";
import React, {useEffect} from "react";

interface RadioInputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
  checked: boolean;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  handleChange,
  options,
  checked,
}) => {

  return (
    <div onChange={handleChange}>
      {options.map((option) => (
        <label className="bonadocs__editor__input__radio" key={option.value}>
          <input
            type="radio"
            checked={
              checked && option.truthyValue === true
                ? true
                : !checked && option.truthyValue === false
                ? true
                : undefined
            }
            value={option.value}
            name={option.label}
          />
          {option.description}
        </label>
      ))}
    </div>
  );
};
