import React from "react";

interface BonadocsEditorSidebarOptionsItemProps {
  className?: string;
  name: string;
  icon?: React.ReactNode;
}
export const BonadocsEditorSidebarOptionsItem: React.FC<
  BonadocsEditorSidebarOptionsItemProps
> = ({icon, name, className}) => {
  // Component logic goes here
  return (
    <div className={className}>
      <div>{icon}</div>
      <div>{name}</div>
    </div>
  );
};
