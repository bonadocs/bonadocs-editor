import React from "react";
import clsx from "clsx";
interface BonadocsEditorProjectsCreationActionStepsItemProps {
  className?: string;
  icon?: React.ReactNode | string;
  iconText?: string;
  onClick?: () => void;
  disabled?: boolean;
}
export const BonadocsEditorProjectsCreationActionStepsItem: React.FC<
  BonadocsEditorProjectsCreationActionStepsItemProps
> = ({ className, icon, iconText, onClick, disabled }) => {
  return (
    <div onClick={onClick} className={clsx(className, disabled && 'bona__disabled')}>
      <div className={`${className}__icon`}>{icon}</div>
      <h3 className={`${className}__text`}>{iconText}</h3>
    </div>
  );
};
