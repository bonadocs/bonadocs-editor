import React from "react";

interface BonadocsEditorViewPlaygroundMethodControlbarItemProps {
  children?: React.ReactNode | string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}
export const BonadocsEditorViewPlaygroundMethodControlbarItem: React.FC<
  BonadocsEditorViewPlaygroundMethodControlbarItemProps
> = ({ children, active, onClick, disabled }) => {
  // Your component code here
  return (
    <div
      aria-disabled={disabled}
      onClick={onClick}
    >
      <div
        className={`bonadocs__editor__dashboard__controlbar__item ${
          active && "bona__bg"
        }`}
      >
        {active && (
          <div className="bonadocs__editor__dashboard__controlbar__item__leftcurl"></div>
        )}
        {children}
        {active && (
          <div className="bonadocs__editor__dashboard__controlbar__item__rightcurl"></div>
        )}
      </div>
    </div>
  );
};
