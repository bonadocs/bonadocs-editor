import React from "react";

interface BonadocsEditorViewControlBarItemProps {
  children?: React.ReactNode | string;
  active?: boolean;
}
export const BonadocsEditorViewControlBarItem: React.FC<
  BonadocsEditorViewControlBarItemProps
> = ({ children, active }) => {
  // Your component code here
  return (
    <div>
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
