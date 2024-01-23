import React from "react";

type TextInputProps = {
  placeholder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
};

export const TextInput = ({
  placeholder,
  handleChange,
  value,
}: TextInputProps) => {
  return (
    <input
      placeholder={placeholder}
      value={value?.toString() || ""}
      onChange={handleChange}
      className="bonadocs__editor__input"
    />
  );
};
