import React from "react";

interface CheckboxInputProps {
  checked?: boolean;
  handleChange: (checked: boolean) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  checked,
  handleChange,
}) => {
  return (
    <label className="bonadocs__editor__status">
      <input
        className="bonadocs__editor__status__input"
        type="checkbox"
        defaultChecked={checked}
        checked={checked}
        onChange={(event) =>
          handleChange(
            "checked" in event.target &&
              typeof event.target.checked === "boolean" &&
              event.target.checked
          )
        }
      />
      <span className="bonadocs__editor__status__slider bonadocs__editor__status__round"></span>
    </label>
  );
};
