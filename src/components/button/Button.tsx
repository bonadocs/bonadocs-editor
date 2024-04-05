import React, { ReactElement } from "react";
import clsx from "clsx";

interface ButtonProps {
  onClick: () => void;
  children: ReactElement | string;
  type?: "action" | "inertia" | "critical";
  className?: string;
  disabled?: boolean
}

const buttonType = {
  action: "bonadocs__button__action",
  inertia: "bonadocs__button__inertia",
  critical: "bonadocs__button__critical",
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "inertia",
  className,
  disabled
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "bonadocs__button",
        type === "action" ? buttonType[type] : buttonType[type],
        className
      )}
      id="ctn__button"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};
