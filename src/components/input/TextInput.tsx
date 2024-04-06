import React from "react";

type TextInputProps = {
  placeholder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  className?: string;
  disabled?: boolean;
};

export const TextInput = ({
  placeholder,
  handleChange,
  value,
  className,
  disabled,
}: TextInputProps) => {
  return (
    <input
      disabled={disabled}
      placeholder={placeholder}
      value={value?.toString() || ""}
      onChange={handleChange}
      className={`bonadocs__editor__input ${className}`}
    />
  );
};
