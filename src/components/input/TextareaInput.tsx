import React from "react";

type TextareaInputProps = {
  placeholder?: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | number;
  className?: string;
  disabled?: boolean;
};

export const TextareaInput = ({
  placeholder,
  handleChange,
  value,
  className,
  disabled,
}: TextareaInputProps) => {
  return (
    <textarea
      disabled={disabled}
      placeholder={placeholder}
      value={value?.toString() || ""}
      onChange={handleChange}
      className={`bonadocs__editor__input ${className}`}
    />
  );
};
