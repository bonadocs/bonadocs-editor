import React, { useEffect } from "react";
import clsx from "clsx";

interface CheckboxInputProps {
  checked?: boolean;
  handleChange: (checked: boolean) => void;
  className?: string;
  id?: string;
  dynamic?: boolean;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  checked,
  handleChange,
  className,
  id,
  dynamic = true,
}) => {
  useEffect(() => {}, [checked]);
  return (
    <label id={id} className={clsx(className, "bonadocs__editor__status")}>
      <input
        className="bonadocs__editor__status__input"
        type="checkbox"
        checked={dynamic ? checked : undefined}
        defaultChecked={!dynamic && checked}
        onChange={(event) => {
          handleChange(
            "checked" in event.target &&
              typeof event.target.checked === "boolean" &&
              event.target.checked
          );
        }}
      />
      <span className="bonadocs__editor__status__slider bonadocs__editor__status__round"></span>
    </label>
  );
};
